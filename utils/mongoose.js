import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const connectToDB = await mongoose.connect(process.env.DATABASE_URL);
        console.log(`MongoDB connected: running on: ${connectToDB.connection.host}`)
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}