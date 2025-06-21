import express, { Request, Response } from 'express';
import { Book } from '../models/book.model';
import { Borrow } from '../models/borrow.model';
import mongoose from 'mongoose';

export const borrowRoute = express.Router();

// post borrow api
borrowRoute.post('/', async (req: Request, res: Response) => {
    try {
        const { book: bookId, quantity, dueDate } = req.body;

        const targetedBook = await Book.findById(bookId);

        if (!targetedBook) {
            res.status(404).json({ success: false, message: 'Book not found' })
        }
        else if (targetedBook?.copies >= quantity) {
            await targetedBook?.decreaseCopies(quantity);
            const data = await Borrow.create({ book: targetedBook?._id, quantity, dueDate });

            res.status(201).send({ success: true, message: 'Book borrowed successfully', data })
        };

        res.status(400).send({ success: false, message: `only ${targetedBook?.copies} copies are available` })


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
            message: 'Something went wrong',
            error: (error as Error).message,
        });
    }
})

// get borrow api with aggregation
borrowRoute.get('/', async (req: Request, res: Response) => {
    try {
        const data = await Borrow.aggregate([
            {
                $group: {
                    _id: "$book",
                    totalQuantity: { $sum: "$quantity" }
                }
            },
            {
                $lookup: {
                    from: 'books',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'bookDetails'
                }
            },
            { $unwind: '$bookDetails' },
            {
                $project: {
                    _id: 0,
                    book: {
                        title: '$bookDetails.title', isbn: '$bookDetails.isbn'
                    },
                    totalQuantity: 1
                }
            }
        ])

        res.status(201).send({
            success: true,
            message: 'Borrowed books summary retrieved successfully',
            data
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Get Borrow details failed',
            error: (error as Error).message,
        });
    }

})


