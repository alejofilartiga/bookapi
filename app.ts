import express from "express";
import { connectDB } from "./db/config";
import dotenv from "dotenv"
import booksRoute from "./routes/books"
import cors from "cors"

const corsConfig = {
  origin: "https://librarypanel.vercel.app",
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  preflightContinue: false,
  optionsSuccessStatus: 200,
  credentials: true,
  exposedHeaders: ["Content-Range", "X-Content-Range"]
}

dotenv.config()

const app = express()

connectDB()

app.use(cors(corsConfig))
app.use(express.json())
app.use("/bookapi",booksRoute)
app.options(/(.*)/, cors(corsConfig))

app.listen(process.env.PORT,() => {
  console.log("Servidor iniciado en el puerto",process.env.PORT)
})