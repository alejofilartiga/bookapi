import express from "express";
import { connectDB } from "./db/config";
import dotenv from "dotenv"
import booksRoute from "./routes/books"
import cors from "cors"

const corsConfig = {
  origin:"*",
  credential:true,
  methods: ["GET", "POST", "PATCH", "DELETE"],
}

dotenv.config()

const app = express()

connectDB()

app.use(cors(corsConfig))
app.use(express.json())
app.use("/bookapi",booksRoute)
app.listen(process.env.PORT,() => {
  console.log("Servidor iniciado en el puerto",process.env.PORT)
})