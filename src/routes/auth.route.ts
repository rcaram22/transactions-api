import { NextFunction, Request, Response, Router } from 'express';
import { login } from '../controllers/auth.controller';

const router = Router();

router.post(
  '/login',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const access_token = await login(req.body);
      res.status(200).json({ access_token });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
