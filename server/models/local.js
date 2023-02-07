import { Schema, model } from 'mongoose';

const localSchema = Schema({
  name: { type: String, required: true }
});

const Local = model('Local', localSchema);

export default Local;
