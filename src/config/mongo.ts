import 'dotenv/config';
import mongoose from 'mongoose';
import logger from '../utils/log.handler';

/**
 * Connects to MongoDB using the provided DB_URI from the environment variables.
 */
const dbConnect = async (): Promise<void> => {
  const DB_URI = process.env.DB_URI as string;
  mongoose.set('strictQuery', false);

  try {
    await mongoose.connect(DB_URI);
    logger.info('✅ Connected to MongoDB');
  } catch (error) {
    logger.error('❌ Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

/**
 * Disconnects from the MongoDB database.
 */
const dbDisconnect = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
    logger.info('🔌 Disconnected from MongoDB');
  } catch (error) {
    logger.error('❌ Error disconnecting from MongoDB:', error);
  }
};

export { dbConnect, dbDisconnect };
