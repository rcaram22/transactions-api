import currencyModel from '../models/currency.model';

export const seedCurrencies = async () => {
  try {
    // Check if currencies already exist
    const currenciesCount = await currencyModel.countDocuments();

    if (currenciesCount > 0) {
      console.log('⚠️  Currencies already exist, skipping seeding.');
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
    console.log('🎉 Currencies seeded successfully.');
  } catch (error) {
    console.error('❌ Error seeding currencies:', error);
    throw error;
  }
};
