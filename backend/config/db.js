import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI)
        console.log(`Successfully connected to mongodb`)

    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

export default connectDB;