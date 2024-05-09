import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import path from 'path';
import dotenv from 'dotenv';
import User from '@api/models/user';
import { authRequest } from '@api/types/users';
import { Request, Response, NextFunction } from 'express';

dotenv.config({ path: path.join(__dirname, '../../.env') });

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = req.body;
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(payload.password, salt);
    const create = await new User({ ...payload, password, salt }).save();
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

    const token = jwt.sign({
      ...rest,
    }, process.env.SECRET_KEY);

    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).send(req.body);
  } catch (error) {
    return next(error);
  }
};

export const getCurrentUser = async (req: authRequest, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const { userId } = req;
    const user = await User.findById(userId).select('-password -salt __v');
    if (!user) return res.sendStatus(404);
    const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);

    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

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
