import express from 'express';
import { createBook, deleteBook, getAllBooks, getBookById, updateBook } from '../controllers/book.controller';

export const bookRouter=express.Router();

bookRouter.get('/',getAllBooks);
bookRouter.get('/:id',getBookById);
bookRouter.post('/',createBook);
bookRouter.put('/',updateBook);
bookRouter.delete('/:id',deleteBook);