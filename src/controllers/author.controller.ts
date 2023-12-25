import { Request, Response } from "express";
import { prisma } from './../db/prisma';


export const getAllAuthors=async(req:Request,res:Response)=>{
    try {
        const authors=await prisma.author.findMany({
            select:{
                id:true,firstName:true,lastName:true
            }
        });
        return res.status(200).json(authors);
    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}
export const getAuthorById=async(req:Request,res:Response)=>{
    try {
       const id=req.params.id;
       const author=await prisma.author.findUnique({where:{id:Number(id)}, select:{
        id:true,firstName:true,lastName:true
    }});
       if(!author) return res.status(404).json('Author not found!');
       return res.status(200).json(author); 
    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}

export const createAuthor=async(req:Request,res:Response)=>{
    try {
        const {firstName,lastName}=req.body;
        const author=await prisma.author.create({
            data:{firstName,lastName},
            select:{
                id:true,firstName:true,lastName:true
            }
        })
        return res.status(201).json(author);
    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}

export const updateAuthor=async(req:Request,res:Response)=>{
    try {
        const {id,firstName,lastName}=req.body;
        const author=await prisma.author.findUnique({where:{id:Number(id)}});
        if(!author) return res.status(404).json('Author not found!');
        const updatedAuthor=await prisma.author.update({
            where:{id:Number(id)},
            data:{firstName,lastName},
            select:{id:true,firstName:true,lastName:true}
        });
        return res.status(201).json(updatedAuthor);
    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}

export const deleteAuthor=async(req:Request,res:Response)=>{
    try {
        const id=req.params.id;
        const author=await prisma.author.findUnique({where:{id:Number(id)}});
        if(!author) return res.status(404).json('Author not found!');
        await prisma.author.delete({where:{id:Number(id)}});
        return res.status(204).json('Author deleted!');
    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}
