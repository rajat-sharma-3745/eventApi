import { MongoClient } from 'mongodb'
import { ApiError } from '../utils/apiError.js';

const client = new MongoClient(process.env.MONGO_URI);

let db;
export const connectDb = async () => {
    if (db) return db;
    try {
        await client.connect();
        db = client.db('events');
        console.log("Connected to MongoDB");
        return db;
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
}

export function getDB() {
  if (!db) throw new ApiError("Database not connected yet!",500);
  return db;
}