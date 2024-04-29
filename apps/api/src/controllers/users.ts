import { Request, Response, NextFunction } from 'express';

export const someRequest = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    return res.sendStatus(200);
  } catch (error) {
    return next(error);
  }
};

export const holder = '';
