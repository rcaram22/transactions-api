import express from 'express';
import transactions from './transactions.route';
import auth from './auth.route';
import transfers from './transfers.route';

const router = express.Router();

router.use('/transactions', transactions);
router.use('/auth', auth);
router.use('/transfer', transfers);

export default router;
