import { NextFunction, Request, Response } from 'express';
import AccountModel from '../models/account.model';
import TransactionModel from '../models/transaction.model';
import { ErrorHandler } from '../utils/error.handler';
import logger from '../utils/log.handler';

const queryBuilder = (filters: any) => {
  const query: any = {};
  if (Object.prototype.hasOwnProperty.call(filters, 'from') && Object.prototype.hasOwnProperty.call(filters, 'to')) {
    query['date'] = { $gte: filters.from, $lte: filters.to };
  } else {
    if (Object.prototype.hasOwnProperty.call(filters, 'from')) {
      query['date'] = { $gte: filters.from };
    }
    if (Object.prototype.hasOwnProperty.call(filters, 'to')) {
      query['date'] = { $lte: filters.to };
    }
  }
  if (Object.prototype.hasOwnProperty.call(filters, 'source_account_id')) {
    query['accountFrom'] = filters['source_account_id'];
  }

  return query;
};

const getUserTransactions = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = (req as Request & { user?: any }).user;
    const filters = req.query;
    let queryFilters: any = queryBuilder(filters);
    let accounts: any[] = [];

    if (!queryFilters.accountFrom) {
      accounts = await AccountModel.find({ owner: user.id });
      queryFilters.accountFrom = { $in: accounts };
    } else {
      const account = await AccountModel.findById(queryFilters.accountFrom);
      if (account?.owner.toString() !== user.id) {
        return next(new ErrorHandler(404, 'Account not found'));
      }
    }

    const transactions = await TransactionModel.find(queryFilters).populate('currency');
    res.status(200).json({
      data: transactions,
    });
  } catch (error) {
    logger.error(error);
    next(new ErrorHandler(500, 'Error while fetching transactions'));
  }
};

export { getUserTransactions };
