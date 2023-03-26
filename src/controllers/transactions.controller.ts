import { Transaction } from '../interfaces/transaction.interface';
import AccountModel from '../models/account.model';
import TransactionModel from '../models/transaction.model';
import { ErrorHandler } from '../utils/error.handler';
import { verifyToken } from '../utils/token.handler';

const queryBuilder = (filters: any) => {
  const query: any = {};
  if (
    Object.prototype.hasOwnProperty.call(filters, 'from') &&
    Object.prototype.hasOwnProperty.call(filters, 'to')
  ) {
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

const getUserTransactions = async (
  token: string,
  filters: any
): Promise<Transaction[]> => {
  try {
    let queryFilters: any = queryBuilder(filters);
    const { id } = verifyToken(token);
    let accounts: any[] = [];

    if (!queryFilters.accountFrom) {
      accounts = await AccountModel.find({ owner: id });
      queryFilters.accountFrom = { $in: accounts };
    } else {
      const account = await AccountModel.findById(queryFilters.accountFrom);
      if (account?.owner.toString() !== id) {
        throw new ErrorHandler(404, 'Account not found');
      }
    }

    const transactions = await TransactionModel.find(queryFilters).populate(
      'currency'
    );

    return transactions;
  } catch (error: any) {
    if (error?.statusCode === 400 || error?.statusCode === 404) {
      throw error;
    }
    console.error(error);
    throw new ErrorHandler(500, 'Error while getting transactions');
  }
};

export { getUserTransactions };
