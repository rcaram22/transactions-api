import { Request, Response, NextFunction } from 'express';
import { ErrorHandler } from '../utils/error.handler';

const handleError = (err: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    statusCode,
    message,
  });
};

export { handleError };
