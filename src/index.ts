import express, { Request, Response } from "express"
import dotenv from "dotenv"

dotenv.config()
const app = express()

const PORT = process.env.PORT

app.get("/", (req : Request, resp : Response) => {
    resp.send("Endpoint raiz")
})

app.get("/todos", (req : Request, resp : Response) => {
    const todos = [
        { id : 1, descripcion : "Preparar la comida" },
        { id : 2, descripcion : "Estudiar" },
    ]
    resp.json(todos)
})

app.listen(PORT, () => {
    console.log(`Se inició servidor en puerto ${PORT}`)
})