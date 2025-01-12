import { Router } from 'express';
import { transfer } from '../controllers/transfers.controller';

const router = Router();

router.post('/', transfer);

export default router;
