import { dbConnect, dbDisconnect } from '../config/mongo';
import logger from '../utils/log.handler';
import { seedCurrencies } from './seedCurrencies';
import { seedUsers } from './seedUsers';

const seedDatabase = async () => {
  try {
    await dbConnect();
    await seedUsers();
    await seedCurrencies();
    logger.info('🌱 Database seeding completed.');
    await dbDisconnect();
  } catch (error) {
    logger.error('❌ Error during database seeding:', error);
    process.exit(1);
  }
};

seedDatabase();
