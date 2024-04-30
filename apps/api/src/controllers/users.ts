import User from '@api/models/user';
import { Request, Response, NextFunction } from 'express';

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  const payload = {
    fullname: 'Alex Stand',
    email: 'mem@gmail.com',
    firebaseId: '569*5qsd',
    avatar: 'sqd.png',
    phoneNumber: '+213777777777',
    kind: 'MEMBER'
  };
  const newUser = await new User(payload).save();
  return res.status(200).send(newUser);
}

export const getUserById = (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).send({ user: req.params.id });
}
