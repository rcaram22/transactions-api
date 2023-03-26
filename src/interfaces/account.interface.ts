import { User } from "./user.interface";
import { Currency } from "./currency.interface";

export interface Account {
  owner: User;
  currency: Currency;
  balance: number;
}
