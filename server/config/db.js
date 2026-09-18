import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ path: new URL('../.env', import.meta.url).pathname });
const MONGO_URI = "mongodb://localhost:27017/notes_db"
// const MONGO_URI = process.env.MONGO_URI;
export default async function ConnectToDB() {
    if (!MONGO_URI) throw new Error('Set MONGO_URI in server/.env');
    await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 10000 });
    console.log('Connected to database');
}
