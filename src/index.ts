import express, { Request, Response } from "express"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import cors from "cors"
import TodosController from "./controllers/TodosController"

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

// Configuración entidad TODO
app.use("/todos", TodosController())

app.listen(PORT, () => {
    console.log(`Se inició servidor en puerto ${PORT}`)
})