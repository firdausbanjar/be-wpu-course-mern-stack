import jwt from 'jsonwebtoken';
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

export const generateToken = (user: IUserToken) => {
  const token = jwt.sign(user, SECRET_KEY_JWT, { expiresIn: '1h' });
  return token;
};

export const getUserData = (token: string) => {
  const user = jwt.verify(token, SECRET_KEY_JWT) as IUserToken;
  return user;
};
