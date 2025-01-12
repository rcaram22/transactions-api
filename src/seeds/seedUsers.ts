import bcrypt from 'bcrypt';
import userModel from '../models/user.model';
import logger from '../utils/log.handler';

export const seedUsers = async () => {
  try {
    // Check if users already exist
    const userCount = await userModel.countDocuments();

    if (userCount > 0) {
      logger.info('⚠️  Users already exist, skipping seeding.');
      return;
    }

    const users = [
      {
        username: 'pacosta',
        name: 'Pedro',
        lastName: 'Acosta',
        password: 'pacosta123',
      },
      {
        username: 'jperez',
        name: 'Jorge',
        lastName: 'Perez',
        password: 'jperez123',
      },
      {
        username: 'rcaram',
        name: 'Ramiro',
        lastName: 'Caram',
        password: 'rcaram123',
      },
    ];

    // Hash passwords before inserting
    const saltRounds = 10;
    const hashedUsers = await Promise.all(
      users.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, saltRounds),
      }))
    );

    // Insert users with hashed passwords
    await userModel.insertMany(hashedUsers);
    logger.info('🎉 Users seeded successfully.');
  } catch (error) {
    logger.error('❌ Error seeding users:', error);
    throw error;
  }
};
