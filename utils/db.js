import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from a .env file
dotenv.config();

// MongoDB URI
const mongoURI = process.env.MONGO_URL;  // Replace with your MongoDB URI

// Connect to MongoDB using Mongoose
const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://wtltourism:wtltourism@cluster0.2l8rd.mongodb.net/parmeshwarCab`);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        process.exit(1);  // Exit the process if connection fails
    }
};

export default connectDB;
