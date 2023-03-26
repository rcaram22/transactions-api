import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/token.handler";

const invalidTokenResponse = (res: Response) => {
  return res.status(401).send("Invalid token");
};

const checkToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const accessToken = req.headers.authorization || "";
    const isValid = verifyToken(accessToken);

    if (!isValid) {
      invalidTokenResponse(res);
    } else {
      next();
    }
  } catch (error) {
    console.error(error);
    invalidTokenResponse(res);
  }
};

export { checkToken };
