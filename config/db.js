import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_LINK, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        });
        console.log('Se conectó a MongoDB');
    } catch (error) {
        console.error('Error conectandose a MongoDB', error);
        process.exit(1); // Detener la aplicación en caso de error
    }
};