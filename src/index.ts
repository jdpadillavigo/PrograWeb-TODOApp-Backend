import express, { Request, Response } from "express"
import dotenv from "dotenv"
import { listaTODOs, TODO } from "./data"
import bodyParser from "body-parser"
import cors from "cors"
import { PrismaClient } from "./generated/prisma"

dotenv.config()
const app = express()

// Configuración del servidor HTTP para recibir peticiones
// por el payload (cuerpo) y convertirlos en objetos js/ts
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended : true
}))

app.use(cors()) // Configurando cors

app.use(express.static("assets"))

const PORT = process.env.PORT

app.get("/", (req : Request, resp : Response) => {
    resp.send("Endpoint raíz")
})

app.get("/todos", async (req : Request, resp : Response) => {
    const prisma = new PrismaClient()

    const estado = req.query.estado

    if (estado == undefined) {
        // No hay estado, devolvemos todos los TODOs
        const todos = await prisma.todo.findMany()
        resp.json(todos)
        return
    }

    // Devolvemos los TODOs filtrados por estado
    const todos = await prisma.todo.findMany({
        where : {
            estado : estado == "0" ? false : true
        }
    })
    resp.json(todos)
})

app.get("/todos/:id", (req : Request, resp : Response) => {
    const id = req.params.id

    let todoEncontrado : TODO | null = null
    for (let todo of listaTODOs) {
        if (todo.id.toString() == id) {
            todoEncontrado = todo
            break
        }
    }

    if (todoEncontrado == null) {
        // Error: No se encontró
        resp.status(400).json({
            msg : "Código incorrecto"
        })
    }

    resp.json(todoEncontrado)
})

app.post("/todos", async (req : Request, resp : Response) => {
    const prisma = new PrismaClient()
    const todo = req.body

    if (todo.descripcion == undefined) {
        resp.status(400).json({
            msg : "Debe enviar campo descripción"
        })
        return
    }

    const todoCreado = await prisma.todo.create({
        data : todo
    })

    resp.json({
        msg : "",
        todo : todoCreado
    })
})

app.put("/todos/:id", (req : Request, resp : Response) => {
    const todo = req.body
    const todoId = req.params.id
    const todos = listaTODOs

    if (todoId == undefined) {
        resp.status(400).json({
            msg : "Debe enviar un id como parte del path"
        })
        return
    }

    if (todo.descripcion == undefined) {
        resp.status(400).json({
            msg : "Debe enviar un campo descripción"
        })
        return
    }

    for (let t of todos) {
        if (t.id.toString() == todoId) {
            t.descripcion = todo.descripcion

            resp.json({
                msg : ""
            })
        }
    }

    resp.status(400).json({
        msg : "No existe TODO con ese id"
    })
})

app.delete("/todos/:id", (req : Request, resp : Response) => {
    const todoId = req.params.id
    const todos = listaTODOs

    const indiceAEliminar = listaTODOs.findIndex((t : TODO) => {
        return t.id.toString() == todoId
    })

    if (indiceAEliminar == -1) {
        resp.status(400).json({
            msg : "No existe TODO con ese id"
        })
        return
    }

    todos.splice(indiceAEliminar, 1)

    resp.json({
        msg : ""
    })

    // let indice = 0
    // for (let t of todos) {
    //     if (t.id.toString() == todoId) {
    //         todos.splice(indice, 1)
    //         resp.json({
    //             msg : ""
    //         })
    //         return
    //     }
    //     indice++
    // }
})

app.listen(PORT, () => {
    console.log(`Se inició servidor en puerto ${PORT}`)
})