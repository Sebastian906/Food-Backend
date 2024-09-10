import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_LINK, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,  // Aumenta el tiempo de espera (5000 ms = 5 segundos)
            socketTimeoutMS: 45000,  // Tiempo de espera para los sockets (45000 ms = 45 segundos)
        });
        console.log('Se conectó a MongoDB');
    } catch (error) {
        console.error('Error conectandose a MongoDB', error);
        process.exit(1); // Detener la aplicación en caso de error
    }
};