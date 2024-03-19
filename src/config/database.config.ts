// Imports
import mongoose from 'mongoose';

// Mongo connection string
const mongoURL: string =
  process.env.MONGOOSE_CONNECTION_URL ||
  'mongodb://localhost:27017/pokemon_tournament';

/**
 * Connects to MongoDB database
 */
const dbConnection = async (): Promise<void> => {
  try {
    const connection = await mongoose.connect(mongoURL);
    const url: string = `${connection.connection.host}:${connection.connection.port}`;
    console.log(`MongoDB connected on ${url}`);
  } catch (err) {
    console.error('Could not connect to MongoDB', err);
    process.exit(1);
  }
};

export default dbConnection;
