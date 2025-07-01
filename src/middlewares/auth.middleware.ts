import { NextFunction, Request, Response } from 'express';
import { IUserToken } from '../utils/jwt';

export interface IReqUser extends Request {
  user?: IUserToken;
}

export default (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res.status(403).json({
      message: 'Unauthorized',
      data: null,
    });
  }

  const [prefix, accessToken] = authorization.split(' ');
};
