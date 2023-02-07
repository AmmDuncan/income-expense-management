import { Schema, model } from 'mongoose';

const transactionSchema = Schema({
  detials: { type: String },
  amount: { type: Number },
  type: { type: String, enum: ['income, expense'] },
  local: { type: Schema.Types.ObjectId, ref: 'Local' },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  date: { type: Date }
});

const Transaction = model('Transaction', transactionSchema);

export default Transaction;
