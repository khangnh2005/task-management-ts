import mongoose from 'mongoose'

export const connect = async():Promise<void> => {
    try {
        const mongoUrl = process.env.MONGODB_URL;
        if (!mongoUrl) {
            throw new Error('MONGODB_URL is not defined in environment variables');
        }
        await mongoose.connect(mongoUrl);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Could not connect to MongoDB', error);
    }
}
