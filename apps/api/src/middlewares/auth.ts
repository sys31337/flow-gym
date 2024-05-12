import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { authRequest } from '@api/types/users';
import User from '@api/models/user';

interface JwtPayload {
  _id: string;
  email: string;
  avatar: string;
  kind: string;
  authProvider: string;
  isAdmin: boolean;
  iat: number;
}

const auth = async (req: authRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.headers.authorization) {
      res.status(401);
      throw new Error('AUTHORIZATION_REQUIRED');
    }
    const [type, token] = req.headers.authorization?.split(' ') ?? [];
    if (!token) {
      res.status(401);
      throw new Error('AUTHORIZATION_TOKEN_REQUIRED');
    }

    const decodedValue = jwt.verify(token, type === 'Bearer' ? process.env.SECRET_KEY : process.env.REFRESH_KEY) as JwtPayload;
    if (!decodedValue) {
      res.status(401);
      throw new Error('UNAUTHORIZED_BAD_TOKEN');
    }

    const { originalUrl, method } = req;

    req.email = decodedValue.email;

    if (originalUrl === '/api/v1/users/' && method === 'POST') {
      return next();
    }

    const user = await User.findOne({ email: decodedValue.email });

    if (!user) {
      res.status(404);
      throw new Error('USER_NOTFOUND');
    }

    req.userId = user._id;
    return next();
  } catch (e) {
    return next(e);
  }
};

const isAdmin = async (req: authRequest, res: Response, next: NextFunction) => {
  try {
    const { firebaseId } = req;
    const user = await User.findOne({ firebaseId });
    if (!user) return res.status(404).send('USER_NOT_FOUND');
    if (user.isAdmin) return next();
    return res.status(401).send('NOT_ADMIN');
  } catch (error) {
    return next(error);
  }
};

export { auth, isAdmin };
