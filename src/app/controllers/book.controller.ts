import express, { Request, Response } from "express";
import { Book } from "../models/book.model";
import mongoose from "mongoose";

export const bookRoute = express.Router()

// post api
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

// get api
bookRoute.get('/', async (req: Request, res: Response) => {
    console.log(req.query);
    try {
        const { filter, sortBy = 'createdAt', sort = 'desc', limit = '10' } = req.query;

        const query: Record<string, any> = {};
        if (filter) {
            query.genre = filter
        }

        const sortBook = sort === 'asc' ? 1 : -1;

        const data =  await Book.find(query).sort({[sortBy as string]: sortBook}).limit(parseInt(limit as string));
        
    res.status(201).json({
      success: true,
      message: 'Books retrieved successfully',
      data
    });
    }
     catch (error) {
            if (error instanceof mongoose.Error.ValidationError) {
                res.status(401).send({
                    message: 'Books retrieved failed',
                    success: false,
                    error
                })
            }
        }

    })