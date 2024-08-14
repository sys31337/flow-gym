import { Schema, model } from 'mongoose';
import { AUTHPROVIDERS } from '@api/constants/users';
import type { User } from '@repo/types/user';

const userSchema = new Schema<User>({
  fullname: String,
  email: {
    type: String,
    unique: true,
  },
  firebaseId: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: String,
  avatar: {
    type: String,
    default: 'assets/avatars/default.png',
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  authProvider: {
    type: String,
    enum: AUTHPROVIDERS,
  },
  clubId: {
    type: Schema.Types.ObjectId,
    ref: 'Club',
  },
});

const User = model<User>('User', userSchema);
export default User;
