import { model, Schema } from "mongoose";
import { Book } from "./book.model";
import { IBorrow } from "../interfaces/borrow.interface";

const borrowSchema = new Schema<IBorrow>({
    book : {
        type : Schema.Types.ObjectId,
        ref : Book,
        required : [true, 'Book Id is required']
    },
       quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [1, 'Quantity must be at least 1'],
      validate: {
        validator: Number.isInteger,
        message: 'Quantity must be an integer',
      }
    },
    dueDate : {
        type : Date,
        required : [true, 'Due date is mandetory']
    }
},{
    versionKey : false,
    timestamps : true
})

export const Borrow = model<IBorrow>('Borrow', borrowSchema)