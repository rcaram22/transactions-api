import express from 'express';
import transactions from './transactions.route';
import auth from './auth.route';
import transfers from './transfers.route';
import accounts from './accounts.route';
import { checkToken } from '../middleware/session.middleware';

const router = express.Router();

// Public Routes
router.use('/auth', auth);

// Protected Routes
router.use('/transactions', checkToken, transactions);
router.use('/transfer', checkToken, transfers);
router.use('/accounts', checkToken, accounts);

export default router;
