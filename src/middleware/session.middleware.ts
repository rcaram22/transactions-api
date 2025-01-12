import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../utils/token.handler';
import logger from '../utils/log.handler';

const invalidTokenResponse = (res: Response) => {
  return res.status(401).send('Invalid token');
};

const checkToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return invalidTokenResponse(res);
    }

    const accessToken = authHeader.split(' ')[1];
    const decodedUser = verifyToken(accessToken);

    if (!decodedUser) {
      return invalidTokenResponse(res);
    }

    (req as Request & { user?: any }).user = decodedUser;
    next();
  } catch (error) {
    logger.error('Token verification failed:', error);
    return invalidTokenResponse(res);
  }
};

export { checkToken };
