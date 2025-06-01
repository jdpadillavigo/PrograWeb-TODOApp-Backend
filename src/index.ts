import express, { Request, Response } from "express"
import dotenv from "dotenv"
import { listaTODOs, TODO } from "./data"

dotenv.config()
const app = express()

const PORT = process.env.PORT

app.get("/", (req : Request, resp : Response) => {
    resp.send("Endpoint raíz")
})

app.get("/todos", (req : Request, resp : Response) => {
    const todos = listaTODOs
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

app.listen(PORT, () => {
    console.log(`Se inició servidor en puerto ${PORT}`)
})