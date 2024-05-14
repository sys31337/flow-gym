import { NextFunction, Response } from 'express';
import { authRequest } from '@api/types/users';
import admin from '@api/config/firebase-config';
import User from '@api/models/user';
import { Types } from 'mongoose';

const auth = async (req: authRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.headers.authorization) {
      res.status(401);
      throw new Error('AUTHORIZATION_REQUIRED');
    }
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      res.status(401);
      throw new Error('AUTHORIZATION_TOKEN_REQUIRED');
    }
    const decodedValue = await admin.auth().verifyIdToken(token);

    if (!decodedValue) {
      res.status(401);
      throw new Error('UNAUTHORIZED_BAD_TOKEN');
    }
    const { originalUrl } = req;
    req.firebaseId = decodedValue.uid;
    req.name = decodedValue.name;
    req.email = decodedValue.email;
    req.picture = decodedValue.picture;
    req.authTime = new Date(decodedValue.auth_time * 1000);
    req.authProvider = decodedValue.firebase.sign_in_provider;

    const user = await User.findOne({ firebaseId: decodedValue.uid });
    // if ((originalUrl === '/api/v1/users/google-login' && !user) || (originalUrl !== '/api/v1/users' && method !== 'POST')) {
    if ((originalUrl === '/api/v1/users/provider' && !user)) {
      return next();
    }
    if (!user) {
      res.status(404);
      throw new Error('USER_NOTFOUND');
    }

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
