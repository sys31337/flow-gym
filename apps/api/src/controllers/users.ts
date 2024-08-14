import { Request, Response, NextFunction } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import User from '@api/models/user';
import { authRequest } from '@api/types/users';
import { PASSWORD } from '@api/constants/users';
import { createClub } from '@api/functions/club';
import Club from '@api/models/club';
import { createFirebaseUser } from '@api/functions/firebase';

dotenv.config({ path: path.join(__dirname, '../../.env') });

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = req.body;
    const { email, password, fullname } = payload;
    const firebaseId = await createFirebaseUser({ email, password });
    const userPayload = {
      ...payload, firebaseId, authProvider: PASSWORD,
    };
    const club = await createClub(fullname);
    const newUser = await new User(userPayload).save();
    await Club.updateOne({ _id: club._id }, { userId: newUser._id });
    return res.status(200).send(newUser);
  } catch (error) {
    return next(error);
  }
};

export const providerAuthentication = async (req: authRequest, res: Response, next: NextFunction) => {
  try {
    const { body, name } = req;
    const { firebaseId, email, authProvider } = body;
    const user = await User.findOneAndUpdate({ $or: [{ firebaseId }, { email }] }, { authProvider });
    if (user) return res.status(200).send(user);
    const club = await createClub(name);
    const payload = {
      ...body,
      fullname: name,
      clubId: club._id,
    };
    const newUser = await new User(payload).save();
    await Club.updateOne({ _id: club._id }, { userId: newUser._id });
    return res.status(200).send(newUser);
  } catch (error) {
    return next(error);
  }
};

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.status(200).send(req.body);
  } catch (error) {
    return next(error);
  }
};

export const getCurrentUser = async (req: authRequest, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const { userId } = req;
    const user = await User.findById(userId).select('-password -salt -__v');
    if (!user) return res.sendStatus(404);

    return res.status(200).send(user);
  } catch (error) {
    return next(error);
  }
};

export const getUserById = (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.status(200).send({ user: req.params.id });
  } catch (error) {
    return next(error);
  }
};
export const existance = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email }).lean();
    if (user) return res.status(200).send('EMAIL_IN_USE');
    return res.status(200).send('EMAIL_NOT_IN_USE');
  } catch (error) {
    return next(error);
  }
};
