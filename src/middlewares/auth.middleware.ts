import { NextFunction, Request, Response } from 'express';
import { getUserData, IUserToken } from '../utils/jwt';

export interface IReqUser extends Request {
  user?: IUserToken;
}

export default function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res.status(401).json({
      message: 'Unauthorized',
      data: null,
    });
  }

  const [prefix, token] = authorization.split(' ');

  if (!(prefix.toLowerCase() === 'bearer' && !!token)) {
    return res.status(401).json({
      message: 'Unauthorized',
      data: null,
    });
  }

  const result = getUserData(token);

  if (!result.user) {
    return res.status(401).json({
      message: result.error.message,
      data: null,
    });
  }

  (req as IReqUser).user = result.user;

  next();
}
