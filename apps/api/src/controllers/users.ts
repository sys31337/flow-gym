import User from '@api/models/user';
import { Request, Response, NextFunction } from 'express';

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = req.body;
    const create = await new User(payload).save();
    if (!create) {
      throw new Error('Error happened');
    }
    return res.status(200).send(create);
  } catch (error) {
    return next(error);
  }
}

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  console.log(req.body);
  return res.status(200).send(req.body);
}

export const getUserById = (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).send({ user: req.params.id });
}
