import { dbConnect, dbDisconnect } from '../config/mongo';
import { seedUsers } from './seedUsers';

const seedDatabase = async () => {
  try {
    await dbConnect();
    await seedUsers();
    console.log('🌱 Database seeding completed.');
    await dbDisconnect();
  } catch (error) {
    console.error('❌ Error during database seeding:', error);
    process.exit(1);
  }
};

seedDatabase();
