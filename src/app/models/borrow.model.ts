import mongoose, { Schema,  Model } from 'mongoose';
import { IBorrow } from '../interfaces/borrow.interface';



const borrowSchema = new Schema<IBorrow>({
  book: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
  quantity: { type: Number, required: true, min: 1 },
  dueDate: { type: Date, required: true }
}, { timestamps: true });

export const Borrow: Model<IBorrow> = mongoose.model<IBorrow>('Borrow', borrowSchema);
