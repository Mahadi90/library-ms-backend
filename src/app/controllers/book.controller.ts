import express, { Request, Response } from "express";
import { Book } from "../models/book.model";
import mongoose from "mongoose";

export const bookRoute = express.Router()

bookRoute.post('/', async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const data = await Book.create(body);
        res.status(201).send({ success: true, message: "Book created successfully", data })
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            res.status(401).send({
                message: 'Validation failed',
                success: false,
                error
            })
        }
    }


})