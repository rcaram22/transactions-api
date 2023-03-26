import { Currency } from './currency.interface';
import { Account } from './account.interface';

export interface Transaction {
  accountFrom: Account;
  accountTo: Account;
  amount: number;
  date: Date;
  description: string;
  currency: Currency;
}
