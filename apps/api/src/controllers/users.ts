import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import path from 'path';
import dotenv from 'dotenv';
import User from '@api/models/user';
import { authRequest } from '@api/types/users';
import { PASSWORD } from '@api/constants/users';
import { generateTokens } from '@api/utils/jwt';

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

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.status(200).send(req.body);
  } catch (error) {
    return next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('-__v').lean();
    if (!user) return res.sendStatus(404);
    const passwordCheck = await bcrypt.compare(password, user.password);

    if (!passwordCheck) return res.sendStatus(401);
    const { password: _p, salt: _s, ...rest } = user;

    const response = { ...rest, ...generateTokens({ email: user.email }) };

    return res.status(200).send(response);
  } catch (error) {
    return next(error);
  }
};

export const refreshToken = async (req: authRequest, res: Response, next: NextFunction) => {
  try {
    const { userId } = req;
    const user = await User.findById(userId).select('-__v -password -salt').lean();
    if (!user) return res.sendStatus(404);
    const response = { ...user, ...generateTokens({ email: user.email }) };
    return res.status(200).send(response);
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
