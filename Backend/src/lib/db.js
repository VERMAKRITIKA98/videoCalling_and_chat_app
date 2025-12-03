import mongoose from 'mongoose';

export const connectDB = async () =>{
    try {
        const conn  =  await mongoose.connect(process.env.MONGODB_URI);
        console.group(`MongoDB connected on ${conn.connection.host}`)

    } catch (error) {
        console.log('MongoDB connectiion error', error);
    }
}