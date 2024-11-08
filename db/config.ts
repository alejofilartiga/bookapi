import mongoose from "mongoose";

export const connectDB = async ():Promise<void> => {
  try{
    await mongoose.connect(`${process.env.DB_URL}`)
    console.log("Base de datos Online")
  } catch (error) {
    console.log("Error al iniciar la base de datos",error)
  }
}