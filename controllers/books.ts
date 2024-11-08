import {Request, Response} from "express"
import Book, {IBook} from "../models/book"

export const createBook = async (req:Request, res:Response) => {
    try{
      const bookData:IBook = req.body
      const book = new Book (bookData)
      book.save()
      res.status(200).json({msg:"Libro creado correctamente",book})
    } catch {
      res.status(500).json({error:"Error al intentar crear el libro"})
    }
}

export const getBooks = async (req:Request, res:Response ) => {
    try{
        const books = await Book.find()
        if(!books) {
            res.status(400).json({msg:"No se encontraron registros de libros"})
        } else{
            res.status(200).json({books})
        }
    } catch {
        res.status(500).json({msg:"Error al obtener los libros"})
    }
}

export const getBook = async (req:Request, res: Response ) => {
    try{
       const {id}= req.params
       const book = await Book.findOne({_id:id})
       
       if(!book) {
        res.status(400).json({msg:"El libro solicitado no existe"})
       } else{
        res.status(200).json({book})
       }
    } catch {
        res.status(500).json({error:"Error al buscar el libro solicitado"})
    }
}

export const updateBook = async (req: Request, res:Response) => {
    try{
       const {id} = req.params
       const {available} = req.body
       const book = await Book.findOneAndUpdate({_id:id},{available},{new:false})
       if(!book) {
        res.status(400).json({error:"El libro a actualizar no existe"})
       } else {
        res.status(200).json({msg:"Libro actualizado correctamente",book})
       }
       
    } catch {
        res.status(500).json({error:"Error al actualizar el libro solicitado"})
    }
}

export const deleteBook = async (req: Request, res:Response) => {
    try{
        const {id} = req.params
        const book = await Book.findByIdAndDelete({_id:id})
        if(!book) {
            res.status(400).json({error:"El libro a borrar no existe"})
        } else {
            res.status(200).json({msg:"Libro eliminado correctamente"})
        }
    } catch {
        res.status(500).json({error:"Ocurrio un error al eliminar el libro"})
    }
}