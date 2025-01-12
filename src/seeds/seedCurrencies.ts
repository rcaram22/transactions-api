import currencyModel from '../models/currency.model';
import logger from '../utils/log.handler';

export const seedCurrencies = async () => {
  try {
    // Check if currencies already exist
    const currenciesCount = await currencyModel.countDocuments();

    if (currenciesCount > 0) {
      logger.info('⚠️  Currencies already exist, skipping seeding.');
      return;
    }

    const currencies = [
      {
        name: 'Uruguayan Peso',
        code: 'UYU',
      },
      {
        name: 'United States Dollar',
        code: 'USD',
      },
      {
        name: 'Euro',
        code: 'EUR',
      },
    ];

    // Insert currencies
    await currencyModel.insertMany(currencies);
    logger.info('🎉 Currencies seeded successfully.');
  } catch (error) {
    logger.error('❌ Error seeding currencies:', error);
    throw error;
  }
};
