import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

mongoose.set('strictQuery', true);
mongoose.set('runValidators', true);

export async function connect() {
  console.log("Conectando a mongodb")
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.MONGODB_DB}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conexión exitosa MongoDB.');
  } catch (err) {
    console.error('Connection error', err);
    process.exit(1);
  }
}

export const db = mongoose.connection;