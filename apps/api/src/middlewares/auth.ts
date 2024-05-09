import { NextFunction, Response } from 'express';
import { Types } from 'mongoose';
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
    if (!req.cookies.jwt) {
      res.status(401);
      throw new Error('AUTHORIZATION_REQUIRED');
    }

    const cookie = req.cookies.jwt;

    const claims = jwt.verify(cookie, process.env.SECRET_KEY) as JwtPayload;

    if (!claims) {
      res.status(401);
      throw new Error('AUTHORIZATION_TOKEN_REQUIRED');
    }

    const user = await User.findById(claims._id);

    if (!user) {
      res.status(404);
      throw new Error('USER_NOTFOUND');
    }
    req.email = user.email;
    req.providerId = user.authProvider;
    req.userId = user._id as Types.ObjectId;
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
