import AccountModel from "../models/account.model";
import CurrencyModel from "../models/currency.model";
import UserModel from "../models/user.model";
import TransactionModel from "../models/transaction.model";
import { Transaction } from "../interfaces/transaction.interface";
import { Transfer } from "../interfaces/transfer.interface";
import { convert } from "./currency.controller";
import { ErrorHandler } from "../utils/error.handler";
import { verifyToken } from "../utils/token.handler";

const checkAccountFrom = async (transferData: Transfer, userId: string): Promise<any> => {
  try {
    const dbUser = await UserModel.findById(userId);

    if (!dbUser) {
      throw new ErrorHandler(404, "User not found");
    }

    // If the user is found, check if the account exists
    const dbAccount = await AccountModel.findOne({ owner: dbUser._id, _id: transferData.accountFrom });
    if (!dbAccount) {
      throw new ErrorHandler(404, "Invalid account data");
    }

    // If the account is found, check if the balance is enough
    if (dbAccount.balance < transferData.amount) {
      throw new ErrorHandler(400, "Insufficient funds");
    }
  } catch (error) {
    throw error;
  }
};

const checkAccountTo = async (accountTo: string): Promise<any> => {
  try {
    const dbAccount: any = await AccountModel.findById(accountTo);
    if (!dbAccount) {
      throw new ErrorHandler(404, "Invalid account data");
    }
  } catch (error) {
    throw error;
  }
};

const checkTransferData = async (transferData: Transfer, token: string): Promise<any> => {
  try {
    //if the accounts are the same, throw an error
    if (transferData.accountFrom === transferData.accountTo) {
      throw new ErrorHandler(400, "The accounts must be different");
    }

    //If the amount is less or equal to 0, throw an error
    if (transferData.amount <= 0) {
      throw new ErrorHandler(400, "The amount must be greater than 0");
    }

    const { id } = verifyToken(token);
    await checkAccountFrom(transferData, id);
    await checkAccountTo(transferData.accountTo);
  } catch (error) {
    throw error;
  }
};

const transfer = async (transferData: Transfer, token: string): Promise<any> => {
  let session;
  try {
    await checkTransferData(transferData, token);
    session = await AccountModel.startSession();
    session.startTransaction();

    // Withdrawal from accountFrom
    const dbAccountFrom: any = await AccountModel.findById(transferData.accountFrom);
    const transferCurrency = dbAccountFrom.currency;
    let withdrawalAmount = transferData.amount;

    // Deposit to accountTo
    const dbAccountTo: any = await AccountModel.findById(transferData.accountTo);

    if (dbAccountFrom.owner.toString() !== dbAccountTo.owner.toString()) {
      withdrawalAmount = transferData.amount * 1.01;
    }

    dbAccountFrom.balance -= withdrawalAmount;
    await dbAccountFrom.save();

    let depositAmount = transferData.amount;

    if (dbAccountTo.currency.toString() !== transferCurrency.toString()) {
      const dbCurrencyFrom = await CurrencyModel.findById(transferCurrency);
      const dbCurrencyTo = await CurrencyModel.findById(dbAccountTo.currency);
      if (!dbCurrencyFrom || !dbCurrencyTo) throw new ErrorHandler(500, "Error getting currencies");

      depositAmount = await convert(transferData.amount, dbCurrencyFrom.code, dbCurrencyTo.code);
    }
    dbAccountTo.balance += depositAmount;
    await dbAccountTo.save();

    const transaction: Transaction = {
      accountFrom: dbAccountFrom._id,
      accountTo: dbAccountTo._id,
      amount: transferData.amount,
      date: transferData.date,
      description: transferData.description,
      currency: dbAccountFrom.currency,
    };

    await TransactionModel.create(transaction);
    await session.commitTransaction();
    session.endSession();
  } catch (error: any) {
    if (session) {
      await session.abortTransaction();
      session.endSession();
    }
    if (error?.statusCode === 400 || error?.statusCode === 404) {
      throw error;
    }
    console.error(error);
    throw new ErrorHandler(500, "Error while attempting to transfer");
  }
};

export { transfer };
