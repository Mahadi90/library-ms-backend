
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
        res.status(500).json({
            success: false,
            message: 'Book created failed',
            error: (error as Error).message,
        });
    }
})

// get api
bookRoute.get('/', async (req: Request, res: Response) => {
    try {
        const { filter, sortBy = 'createdAt', sort = 'desc', limit } = req.query;

        const query: Record<string, unknown> = {};
        if (filter) {
            query.genre = filter
        }

        const sortBook = sort === 'asc' ? 1 : -1;

        const data = await Book.find(query).sort({ [sortBy as string]: sortBook }).limit(parseInt(limit as string));

        res.status(201).json({
            success: true,
            message: 'Books retrieved successfully',
            data
        });
    }

    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Book retraived failed',
            error: (error as Error).message,
        });
    }

})

//get by Id api
bookRoute.get('/:bookId', async (req: Request, res: Response) => {
    try {
        const bookId = req.params.bookId;
        const data = await Book.findById(bookId);
        res.status(201).json({
            success: true,
            message: 'Books retrieved successfully',
            data
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Single book retrived failed',
            error: (error as Error).message,
        });
    }
})

// update book api
bookRoute.put('/:bookId', async (req: Request, res: Response) => {
    try {
        const bookId = req.params.bookId;
        const updatedBook = req.body;
        const data = await Book.findByIdAndUpdate(bookId, updatedBook, { new: true });
        if (!updatedBook) {
            res.status(404).json({
                success: false,
                message: 'Book not found',
            });
        }
      
        res.status(201).json({
            success: true,
            message: 'Books updated successfully',
            data
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Books update failed',
            error: (error as Error).message,
        });
    }
})

// delete book api
bookRoute.delete('/:bookId', async (req: Request, res: Response) => {
    try {
        const { bookId } = req.params;

        const deletedBook = await Book.findByIdAndDelete(bookId);

        if (!deletedBook) {
            res.status(404).json({
                success: false,
                message: 'Book not found',
            });
        }

        res.status(200).send({
            success: true,
            message: 'Book deleted successfully',
            data: null,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete book',
            error: (error as Error).message,
        });
    }
});