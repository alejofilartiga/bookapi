import { Router } from "express";
import {createBook, getBooks, getBook, updateBook, deleteBook} from "../controllers/books"
const router = Router()

// [C]reate
router.post("/",createBook)         
// [R]ead
router.get("/",getBooks)
router.get("/:id",getBook)
// [U]pdate
router.patch("/:id",updateBook)
// [D]elete
router.delete("/:id",deleteBook)

export default router