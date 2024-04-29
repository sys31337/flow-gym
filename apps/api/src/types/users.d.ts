import { Request } from 'express';
import { Document, Types, PopulatedDoc } from 'mongoose';

export interface IUser extends Document {
  firstname: string;
  lastname: string;
  email: string;
  firebaseId: string;
  providerId: string;
  profilePicture: string;
  botsAvailable: number;
  isAdmin: boolean;
  activeSubscription: Types.ObjectId | ISubscription;
  resetCode: {
    value: number;
    expiresAt: Date;
    createdAt: Date;
  };
  resetPasswordUid: string;
  isWhiteLabel: boolean;
  isSubAccount: boolean;
  childrenUsers: [Types.ObjectId | PopulatedDoc<IUser>];
  parentAccountId: Types.ObjectId | PopulatedDoc<IUser>;
  whiteLabel: Types.ObjectId | PopulatedDoc<IWhitelabel>;
  subAccountsRemaining: number;
  monthlyMessagesLimit: number;
  usedMessages: number;
  monthlyLimit: number;
  crawlLimit: number;
  createdAt: Date;
  updatedAt: Date;
}

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
