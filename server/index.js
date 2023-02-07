import { Nitro } from 'nitropack';
import mongoose from 'mongoose';

export default async (_nitroapp) => {
  try {
    const config = useRuntimeConfig();
    console.log('Connection String:', config.mongodbUri);
    await mongoose.connect(config.mongodbUri);
    console.log('Connected to MongoDB...');
  } catch (e) {
    console.log(e);
  }
};
