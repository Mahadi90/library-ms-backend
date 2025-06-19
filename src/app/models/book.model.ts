import { model, Schema } from "mongoose";
import { IBook } from "../interfaces/book.interface";

const bookSchema = new Schema<IBook>({
    title: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    genre: {
        type: String,
        required: true,
        uppercase : true,
        enum: ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY'],
        trim: true
    },
    isbn: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String,
        default: '',
        trim: true
    },
    copies: {
        type: Number,
        required: true,
        min: [0, 'You must be give a positive number'],
        validate: {
            validator: Number.isInteger,
            message: 'copies number must be and integer'
        }
    },
    available: {
        type: Boolean,
        default: true
    }
},{
    versionKey : false,
    timestamps : true
})

export const Book = model('Book', bookSchema)