import { Router } from 'express';
import { getUserTransactions } from '../controllers/transactions.controller';

const router = Router();

router.get('/', getUserTransactions);

export default router;
