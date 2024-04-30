import { Schema, model } from 'mongoose';
import { MEMBER, COACH, MANAGER, ADMIN } from '@api/constants/users';

const userSchema = new Schema({
  fullname: String,
  email: {
    type: String,
    unique: true,
  },
  firebaseId: {
    type: String,
    unique: true
  },
  avatar: String,
  phoneNumber: String,
  kind: {
    type: String,
    enum: [MEMBER, COACH, MANAGER, ADMIN]
  }
});

const User = model('User', userSchema);
export default User;
