import { NextFunction, Request, Response, Router } from "express";
import { getUserTransactions } from "../controllers/transactions.controller";
import { checkToken } from "../middleware/session.middleware";

const router = Router();

router.get("/", checkToken, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization || "";
    const transactions = await getUserTransactions(token, req.query);
    res.status(200).json(transactions);
  } catch (error) {
    next(error);
  }
});

export default router;
