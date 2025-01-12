import { Router } from 'express';
import { createAccount, getUserAccounts, getUserAccountById } from '../controllers/accounts.controller';

const router = Router();

router.post('/', createAccount);
router.get('/', getUserAccounts);
router.get('/:id', getUserAccountById);
// TODO: update and delete accounts maybe

export default router;
