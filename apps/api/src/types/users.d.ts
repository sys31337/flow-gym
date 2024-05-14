import { Request } from 'express';

export interface authRequest extends Request {
  origin?: string;
  firebaseId?: string;
  email?: string;
  picture?: string;
  name?: string;
  authTime?: Date;
  authProvider?: string;
  userId?: string | ObjectId;
  user?: IUser;
}
