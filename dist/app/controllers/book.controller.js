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
exports.bookRoute = void 0;
const express_1 = __importDefault(require("express"));
const book_model_1 = require("../models/book.model");
const mongoose_1 = __importDefault(require("mongoose"));
exports.bookRoute = express_1.default.Router();
// post api
exports.bookRoute.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const data = yield book_model_1.Book.create(body);
        res.status(201).send({ success: true, message: "Book created successfully", data });
    }
    catch (error) {
        if (error instanceof mongoose_1.default.Error.ValidationError) {
            res.status(401).send({
                message: 'Validation failed',
                success: false,
                error
            });
        }
        res.status(500).json({
            success: false,
            message: 'Book created failed',
            error: error.message,
        });
    }
}));
// get api
exports.bookRoute.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filter, sortBy = 'createdAt', sort = 'desc', limit } = req.query;
        const query = {};
        if (filter) {
            query.genre = filter;
        }
        const sortBook = sort === 'asc' ? 1 : -1;
        const data = yield book_model_1.Book.find(query).sort({ [sortBy]: sortBook }).limit(parseInt(limit));
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
            error: error.message,
        });
    }
}));
//get by Id api
exports.bookRoute.get('/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const data = yield book_model_1.Book.findById(bookId);
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
            error: error.message,
        });
    }
}));
// update book api
exports.bookRoute.put('/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const updatedBook = req.body;
        const data = yield book_model_1.Book.findByIdAndUpdate(bookId, updatedBook, { new: true });
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
            error: error.message,
        });
    }
}));
// delete book api
exports.bookRoute.delete('/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        const deletedBook = yield book_model_1.Book.findByIdAndDelete(bookId);
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete book',
            error: error.message,
        });
    }
}));
