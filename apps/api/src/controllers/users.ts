import User from '@api/models/user';
import { authRequest } from '@api/types/users';
import { Request, Response, NextFunction } from 'express';

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = req.body;
    const { email, password } = payload;
    // const firebaseCreate = await admin.auth().createUser({ email, password });
    const firebaseId = 'firebaseCreate.uid';
    const create = await new User({ ...payload, firebaseId }).save();
    if (!create) {
      throw new Error('Could not create user');
    }
    return res.status(200).send(create);
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
    const user = await User.findById(userId);
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
