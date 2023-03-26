import { User } from '../interfaces/user.interface';
import userModel from '../models/user.model';
import { ErrorHandler } from '../utils/error.handler';
import { generateToken } from '../utils/token.handler';

const login = async (user: User) => {
  try {
    const dbUser = await userModel.findOne({ username: user?.username });
    return generateToken(dbUser);
  } catch (error) {
    console.error(error);
    throw new ErrorHandler(500, 'Error while logging in');
  }
};

export { login };
