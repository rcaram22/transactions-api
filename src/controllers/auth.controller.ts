import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import userModel from '../models/user.model';
import { ErrorHandler } from '../utils/error.handler';
import { generateToken } from '../utils/token.handler';

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;
    const dbUser = await userModel.findOne({ username });
    if (!dbUser) {
      return next(new ErrorHandler(401, 'Invalid username or password'));
    }

    const isPasswordValid = await bcrypt.compare(password, dbUser.password);
    if (!isPasswordValid) {
      return next(new ErrorHandler(401, 'Invalid username or password'));
    }
    const access_token = generateToken(dbUser);
    res.status(200).json({ access_token });
  } catch (error) {
    console.error('Error in login controller:', error);
    next(new ErrorHandler(500, 'Error while logging in'));
  }
};

export { login };
