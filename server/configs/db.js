import mongoose from 'mongoose';
const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => {
            console.log('Database connected successfully');
        });

        await mongoose.connect(`${process.env.MONGODB_URI}`, {
            ssl: true,
            serverSelectionTimeoutMS: 5000,
        });

    } catch (error) {
        console.error("MongoDB Error:", error);
        process.exit(1);
    }
}

export default connectDB;