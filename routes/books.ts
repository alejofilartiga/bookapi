import { Router } from "express";
import {createBook, getBooks, getBook, updateBook, deleteBook} from "../controllers/books"
const router = Router()

// [C]reate
router.post("/bookapi",createBook)         
// [R]ead
router.get("/bookapi",getBooks)
router.get("/bookapi/:id",getBook)
// [U]pdate
router.patch("/bookapi/:id",updateBook)
// [D]elete
router.delete("/bookapi/:id",deleteBook)

export default router