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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
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
            validator: function (v) {
                return /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i.test(v) || v === '';
            },
            message: 'Image URL must be a valid URL (jpg, png, etc.)',
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
});
bookSchema.methods.decreaseCopies = function (quantity) {
    return __awaiter(this, void 0, void 0, function* () {
        this.copies -= quantity;
        if (this.copies <= 0) {
            this.copies = 0;
            this.available = false;
        }
        yield this.save();
    });
};
exports.Book = (0, mongoose_1.model)('Book', bookSchema);
