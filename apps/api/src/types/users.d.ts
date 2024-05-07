import { Request } from 'express';
import { Document, Types, PopulatedDoc } from 'mongoose';

export interface authRequest extends Request {
  origin?: string;
  firebaseId?: string;
  email?: string;
  picture?: string;
  name?: string;
  authTime?: Date;
  providerId?: string;
  userId?: string | ObjectId;
  user?: IUser;
}
