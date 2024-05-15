import { Types, PopulatedDoc } from 'mongoose;'
import { Club } from './club';

export interface User extends Document {
  fullname: string;
  email?: string;
  firebaseId?: string;
  phoneNumber?: string;
  avatar?: string;
  kind: "MEMBER" | "COACH" | "MANAGER" | "ADMIN";
  isAdmin?: boolean;
  authProvider: "google.com" | "phone" | "password" | "apple.com"
  clubId: Types.ObjectId | PopulatedDoc<Club>;
}
