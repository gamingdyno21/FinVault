import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import User from '../models/User';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env vars from server/.env
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const viewUsers = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/finvault';
        console.log(`Connecting to MongoDB at ${mongoURI}...`);

        await mongoose.connect(mongoURI);
        console.log('MongoDB connected successfully.');

        const users = await User.find({}, '-password').lean(); // Exclude password

        console.log('\n--- Registered Users ---');
        if (users.length === 0) {
            console.log('No users found.');
        } else {
            console.table(users.map((u: any) => ({
                id: u._id.toString(),
                name: u.name,
                email: u.email,
                joined: u.createdAt
            })));
        }
        console.log('------------------------\n');

    } catch (error) {
        console.error('Error fetching users:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB.');
        process.exit();
    }
};

viewUsers();
