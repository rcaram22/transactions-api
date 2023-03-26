import { NextFunction, Request, Response, Router } from "express";
import { checkToken } from "../middleware/session.middleware";
import { transfer } from "../controllers/transfers.controller";

const router = Router();

router.post("/", checkToken, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization || "";
    const response = await transfer(req.body, token);
    res.status(200).json(response);
  } catch (error: any) {
    res.status(error.statusCode).json({ message: error.message });
  }
});

export default router;
