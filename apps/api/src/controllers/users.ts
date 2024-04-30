import { Request, Response, NextFunction } from 'express';

export const getAllUsers = (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).send({ message: 'hello world22' });
}

export const getUserById = (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).send({ user: req.params.id });
}
