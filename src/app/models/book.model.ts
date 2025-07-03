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
        uppercase: true,
        enum: ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY'],
        trim: true
    },
    img: {
        type: String,
        trim: true,
        default: '',
        validate: {
            validator: function (v: string) {
                return /^https?:\/\/.+$/i.test(v) || v === '';
            },
            message: 'Image URL must be a valid URL.',
        },
    },

    isbn: {
        type: String,
        required: true,
        unique: [true, 'Already eixist {VALUE}, it must be unique'],
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
}, {
    versionKey: false,
    timestamps: true
})

bookSchema.methods.decreaseCopies = async function (quantity: number): Promise<void> {
    this.copies -= quantity;
    if (this.copies <= 0) {
        this.copies = 0;
        this.available = false;
    }
    await this.save();
};

export const Book = model<IBook>('Book', bookSchema)