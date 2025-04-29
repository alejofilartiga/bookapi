import mongoose from "mongoose";

export const connectDB = async ():Promise<void> => {
  try{
    const dbUrl = process.env.DB_URL;
    await mongoose.connect(`${dbUrl}`)
    console.log("Base de datos Online")
  } catch (error) {
    console.log("Error al iniciar la base de datos",error)
  }
}