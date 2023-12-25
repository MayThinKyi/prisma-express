import { Request, Response } from "express";
import { prisma } from "../db/prisma";

export const getAllBooks=async(req:Request,res:Response)=>{
    try {
        const books=await prisma.book.findMany({
            select:{
                id:true,title:true,isFiction:true,year:true,author:{
                    select:{
                        id:true,firstName:true,lastName:true
                    }
                }
            }
        });
        return res.status(200).json(books);
    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}

export const getBookById=async(req:Request,res:Response)=>{
    try {
        const id=req.params.id;
        const book=await prisma.book.findUnique({where:{id:Number(id)},
        select:{
            id:true,title:true,isFiction:true,year:true,author:{
                select:{
                    id:true,firstName:true,lastName:true
                }
            }
        }});
        if(!book) return res.status(404).json('Book not found!');
        return res.status(200).json(book);
    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}

export const createBook=async(req:Request,res:Response)=>{
    try {
        const {title,isFiction,year,authorId}=req.body;
        const book=await prisma.book.create({
            data:{title,isFiction,year,authorId},
            select:{
                id:true,title:true,isFiction:true,year:true,author:{
                    select:{
                        id:true,firstName:true,lastName:true
                    }
                }
            }
        })
        return res.status(201).json(book);
    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}


export const updateBook=async(req:Request,res:Response)=>{
    try {
        const {id,title,isFiction,year,authorId}=req.body;
        const book=await prisma.book.findUnique({where:{id:Number(id)}});
        if(!book) return res.status(404).json('Book not found!');
        const updatedBook=await prisma.book.update({
            where:{id:Number(id)},
            data:{title,isFiction,year,authorId},
            select:{
                id:true,title:true,isFiction:true,year:true,author:{
                    select:{
                        id:true,firstName:true,lastName:true
                    }
                }
            }
        })
        return res.status(201).json(updatedBook);
    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}

export const deleteBook=async(req:Request,res:Response)=>{
    try {
        const id=req.params.id;
        const book=await prisma.book.findUnique({where:{id:Number(id)}});
        if(!book) return res.status(404).json('Book not found!');
        await prisma.book.delete({where:{id:Number(id)}});
        return res.status(204).json('Book deleted!');
    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}