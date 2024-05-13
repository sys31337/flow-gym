import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import path from 'path';
import dotenv from 'dotenv';
import User from '@api/models/user';
import { authRequest } from '@api/types/users';
import { PASSWORD } from '@api/constants/users';

dotenv.config({ path: path.join(__dirname, '../../.env') });

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = req.body;
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(payload.password, salt);
    const userPayload = {
      ...payload, authProvider: PASSWORD, password, salt,
    };
    const create = await new User(userPayload).save();
    return res.status(200).send(create);
  } catch (error) {
    return next(error);
  }
};

export const providerAuthentication = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = req.body;
    const { firebaseId, email } = payload;
    const user = await User.findOne({ $or: [{ firebaseId }, { email }] });
    if (user) res.status(200).send(user);
    const newUser = await new User(payload).save();
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
