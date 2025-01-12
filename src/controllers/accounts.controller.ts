import { NextFunction, Request, Response } from 'express';
import accountModel from '../models/account.model';
import currencyModel from '../models/currency.model';
import { ErrorHandler } from '../utils/error.handler';

const createAccount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = (req as Request & { user?: any }).user;
    const { balance, currency } = req.body;

    // Check if currency exists
    const existingCurrency = await currencyModel.findOne({ code: currency }).lean();
    if (!existingCurrency) {
      return next(new ErrorHandler(400, 'Invalid currency'));
    }

    // Check if the account already exists
    const existingAccount = await accountModel.findOne({ owner: user.id, currency: existingCurrency._id });
    if (existingAccount) {
      return next(new ErrorHandler(400, 'Account already exists for this currency'));
    }

    const newAccount = new accountModel({
      balance,
      currency: existingCurrency._id,
      owner: user.id,
    });

    await newAccount.save();

    res.status(201).json({
      message: 'Account created successfully',
      data: {
        id: newAccount._id,
        balance: newAccount.balance,
        currency: existingCurrency.code,
        owner: user.username,
      },
    });
  } catch (error) {
    console.error('Error creating account:', error);
    next(new ErrorHandler(500, 'Error creating account'));
  }
};

const getUserAccounts = async (req: Request, res: Response, next: NextFunction) => {};

const getUserAccountById = async (req: Request, res: Response, next: NextFunction) => {};

export { createAccount, getUserAccounts, getUserAccountById };
