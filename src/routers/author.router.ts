import express from 'express';
import { createAuthor, deleteAuthor, getAllAuthors, getAuthorById, updateAuthor } from '../controllers/author.controller';

export const authorRouter=express.Router();

authorRouter.get('/',getAllAuthors);
authorRouter.get('/:id',getAuthorById);
authorRouter.post('/',createAuthor);
authorRouter.put('/',updateAuthor);
authorRouter.delete('/:id',deleteAuthor);
