import { Schema, model } from 'mongoose';
import { COACH, MANAGER, ADMIN, MEMBER } from '@api/constants/users';

const userSchema = new Schema({
  fullname: String,
  email: {
    type: String,
    unique: true,
  },
  firebaseId: String,
  phoneNumber: String,
  avatar: { type: String, default: "default.png" },
  kind: {
    type: String,
    enum: [MEMBER, COACH, MANAGER, ADMIN],
    default: MEMBER
  },
  isAdmin: {
    type: Boolean,
    default: false,
  }
  // clubId: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Club',
  // }
});

const User = model('User', userSchema);
export default User;
