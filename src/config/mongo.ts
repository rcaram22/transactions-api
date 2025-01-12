import 'dotenv/config';
import mongoose from 'mongoose';

/**
 * Connects to MongoDB using the provided DB_URI from the environment variables.
 */
const dbConnect = async (): Promise<void> => {
  const DB_URI = process.env.DB_URI as string;
  mongoose.set('strictQuery', false);

  try {
    await mongoose.connect(DB_URI);
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

/**
 * Disconnects from the MongoDB database.
 */
const dbDisconnect = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  } catch (error) {
    console.error('❌ Error disconnecting from MongoDB:', error);
  }
};

export { dbConnect, dbDisconnect };
