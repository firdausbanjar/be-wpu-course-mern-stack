import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import { Types } from 'mongoose';
import { IUser } from '../models/user.model';
import { SECRET_KEY_JWT } from './env';

export interface IUserToken
  extends Omit<
    IUser,
    | 'password'
    | 'activationCode'
    | 'isActive'
    | 'email'
    | 'fullName'
    | 'profilePicture'
    | 'username'
  > {
  id?: Types.ObjectId;
}

export function generateToken(user: IUserToken): string {
  const token = jwt.sign(user, SECRET_KEY_JWT, { expiresIn: '1h' });
  return token;
}

export function getUserData(token: string) {
  try {
    const user = jwt.verify(token, SECRET_KEY_JWT) as IUserToken;
    return { user: user, error: null };
  } catch (error) {
    const err = error as Error as JsonWebTokenError;
    return { user: null, error: err };
  }
}
