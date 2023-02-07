import { Schema, model } from 'mongoose';

const balanceSchema = Schema({
  amount: { type: Number },
  month: { type: Number },
  year: { type: Number },
  local: { type: Schema.Types.ObjectId, ref: 'Local' }
});

const Balance = model('Balance', balanceSchema);

export default Balance;
