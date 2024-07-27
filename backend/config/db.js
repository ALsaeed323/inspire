import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const hostname = '127.0.0.1';
const PORT = process.env.PORT || 3001;

// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://alsaead2110679:${process.env.PASSWORD}@cluster0.vnvsld0.mongodb.net/mydatabase?retryWrites=true&w=majority`
    );
    console.log(`MongoDB connected successfully`);
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
