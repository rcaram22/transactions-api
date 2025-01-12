import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import accountModel from '../models/account.model';
import currencyModel from '../models/currency.model';
import { ErrorHandler } from '../utils/error.handler';
import logger from '../utils/log.handler';

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
    logger.error('Error creating account:', error);
    next(new ErrorHandler(500, 'Error creating account'));
  }
};

const getUserAccounts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = (req as Request & { user?: any }).user;
    const accounts = await accountModel.find({ owner: user.id }).populate('currency').lean();

    res.status(200).json({
      data: accounts.map((account) => ({
        id: account._id,
        balance: account.balance,
        currency: account.currency.code,
        owner: user.username,
      })),
    });
  } catch (error) {
    logger.error('Error fetching user accounts:', error);
    next(new ErrorHandler(500, 'Error fetching user accounts'));
  }
};

const getUserAccountById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = (req as Request & { user?: any }).user;
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      //TODO: This could be validated before with an input validator middleware
      return next(new ErrorHandler(400, 'Invalid account ID format'));
    }

    const account = await accountModel
      .findOne({ _id: new mongoose.Types.ObjectId(id), owner: user.id })
      .populate('currency')
      .lean();

    if (!account) {
      return next(new ErrorHandler(404, 'Account not found'));
    }

    res.status(200).json({
      data: {
        id: account._id,
        balance: account.balance,
        currency: account.currency.code,
        owner: user.username,
      },
    });
  } catch (error) {
    logger.error('Error fetching account:', error);
    next(new ErrorHandler(500, 'Error fetching account'));
  }
};

export { createAccount, getUserAccounts, getUserAccountById };
