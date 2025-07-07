import mongoose from 'mongoose';
import { DATABASE_URL } from './env';

export default async function connect() {
  try {
    await mongoose.connect(DATABASE_URL, {
      dbName: 'db-wpu-mern-stack',
    });

    return Promise.resolve('Database connected');
  } catch (error) {
    const err = error as unknown as Error;
    return Promise.reject(err.message);
  }
}
