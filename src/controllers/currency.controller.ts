import axios from 'axios';
import NodeCache from 'node-cache';
import { ErrorHandler } from '../utils/error.handler';
import { CurrencyConversion } from '../interfaces/currency-conversion.interface';

const cache = new NodeCache();

const saveConversion = (conversion: CurrencyConversion) => {
  cache.set(`${conversion.fromCurrency}-${conversion.toCurrency}`, conversion);
};

const getTodayConversion = (
  conversion: CurrencyConversion
): CurrencyConversion | undefined => {
  const today = new Date();

  if (
    conversion.date.getFullYear() === today.getFullYear() &&
    conversion.date.getMonth() === today.getMonth() &&
    conversion.date.getDate() === today.getDate()
  ) {
    return cache.get(`${conversion.fromCurrency}-${conversion.toCurrency}`);
  }
};

const getConversion = async (
  conversion: CurrencyConversion
): Promise<CurrencyConversion> => {
  let todayConversion = getTodayConversion(conversion);

  if (!todayConversion) {
    const apikey = process.env.APILAYER_KEY || '';
    const url = `${process.env.APILAYER_BASE_URL}/latest?base=${conversion.fromCurrency}&symbols=${conversion.toCurrency}`;
    const response = await axios.get(url, { headers: { apikey: `${apikey}` } });

    const currencyConversion = {
      date: response.data?.date,
      fromCurrency: conversion.fromCurrency,
      toCurrency: conversion.toCurrency,
      rate: response.data?.rates[conversion.toCurrency],
    };
    saveConversion(currencyConversion);
    todayConversion = currencyConversion;
  }

  return todayConversion;
};

const convert = async (
  amount: number,
  fromCurrency: string,
  toCurrency: string
) => {
  try {
    const currencyConversion = {
      date: new Date(),
      fromCurrency,
      toCurrency,
      rate: 0,
    };

    const conversionResult = await getConversion(currencyConversion);

    return conversionResult.rate * amount;
  } catch (error) {
    console.error(error);
    throw new ErrorHandler(500, 'Error while converting currency');
  }
};

export { convert };
