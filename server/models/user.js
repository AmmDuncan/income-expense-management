import { Schema, model } from 'mongoose';

const userSchema = Schema({
  firstName: { type: String },
  lastName: { type: String },
  username: { type: String, unique: true },
  phoneNumber: { type: String, unique: true },
  salt: { type: String },
  hashedPassword: { type: String },
  superAdmin: { type: Boolean, default: false },
  local: { type: Schema.Types.ObjectId, ref: 'Local' }
});

const User = model('User', userSchema);

export default User;
