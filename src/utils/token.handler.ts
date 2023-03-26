import jwt from 'jsonwebtoken';
import { ErrorHandler } from './error.handler';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

const generateToken = (user: any) => {
  try {
    const token = jwt.sign(
      {
        username: user.username,
        name: user.name,
        lastName: user.lastName,
        id: user._id,
      },
      JWT_SECRET,
      {
        expiresIn: '1d',
        algorithm: 'HS256',
      }
    );

    return token;
  } catch (error) {
    console.error(error);
    throw new ErrorHandler(500, 'Error while generating token');
  }
};

const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, JWT_SECRET, { algorithms: ['HS256'] });
  } catch (error) {
    throw new ErrorHandler(401, 'Invalid token');
  }
};

export { generateToken, verifyToken };
