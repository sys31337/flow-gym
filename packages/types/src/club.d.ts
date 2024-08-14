import { Types } from 'mongoose;'
import { User } from './user'

interface Gps {
  longitude: string,
  latitude: string
}

export interface Club extends Document {
  _id: Types.ObjectId;
  uid: number;
  isActive: boolean;
  isTrial: boolean;
  name: string;
  tagline: string;
  gps: Gps;
  logo: string;
  userId: Types.ObjectId | User;
}
