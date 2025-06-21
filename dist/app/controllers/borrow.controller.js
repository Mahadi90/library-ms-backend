"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowRoute = void 0;
const express_1 = __importDefault(require("express"));
const book_model_1 = require("../models/book.model");
const borrow_model_1 = require("../models/borrow.model");
const mongoose_1 = __importDefault(require("mongoose"));
exports.borrowRoute = express_1.default.Router();
// post borrow api
exports.borrowRoute.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { book: bookId, quantity, dueDate } = req.body;
        const targetedBook = yield book_model_1.Book.findById(bookId);
        if (!targetedBook) {
            res.status(404).json({ success: false, message: 'Book not found' });
        }
        else {
            if ((targetedBook === null || targetedBook === void 0 ? void 0 : targetedBook.copies) < quantity) {
                res.status(400).send({ success: false, message: `only ${targetedBook === null || targetedBook === void 0 ? void 0 : targetedBook.copies} copies are available` });
            }
            ;
            yield (targetedBook === null || targetedBook === void 0 ? void 0 : targetedBook.decreaseCopies(quantity));
            const data = yield borrow_model_1.Borrow.create({ book: targetedBook._id, quantity, dueDate });
            res.status(201).send({ success: true, message: 'Book borrowed successfully', data });
        }
    }
    catch (error) {
        if (error instanceof mongoose_1.default.Error.ValidationError) {
            res.status(401).send({
                message: 'Validation failed',
                success: false,
                error
            });
        }
    }
}));
// get borrow api with aggregation
exports.borrowRoute.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield borrow_model_1.Borrow.aggregate([
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
        ]);
        res.status(201).send({
            success: true,
            message: 'Borrowed books summary retrieved successfully',
            data
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(501).json({
                success: false,
                message: 'Failed to delete book',
                error: error.message,
            });
        }
    }
}));
