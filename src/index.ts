import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { authorRouter } from './routers/author.router';
import { bookRouter } from './routers/book.router';

dotenv.config();
const app=express();
app.use(cors());
app.use(express.json());

//Author Router
app.use('/api/authors',authorRouter);
//Book Router
app.use('/api/books',bookRouter);

const PORT=process.env.PORT || 8000;
app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`);
    
})