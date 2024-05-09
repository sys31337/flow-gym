import { Schema, model } from 'mongoose';
import {
  COACH, MANAGER, ADMIN, MEMBER,
  AUTHPROVIDERS,
} from '@api/constants/users';

const userSchema = new Schema({
  fullname: String,
  email: {
    type: String,
    unique: true,
  },
  firebaseId: String,
  phoneNumber: String,
  avatar: { type: String, default: 'default.png' },
  kind: {
    type: String,
    enum: [MEMBER, COACH, MANAGER, ADMIN],
    default: MEMBER,
  },
  password: String,
  salt: String,
  isAdmin: {
    type: Boolean,
    default: false,
  },
  authProvider: {
    type: String,
    enum: AUTHPROVIDERS,
  },
  // clubId: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Club',
  // }
});

const User = model('User', userSchema);
export default User;
