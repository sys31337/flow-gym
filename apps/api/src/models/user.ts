import { model, Schema } from 'mongoose';
import { IUser } from '../types/users';

const usersSchema = new Schema<IUser>({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  firebaseId: {
    type: String,
    required: true,
  },
  providerId: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    required: true,
    default: 'default.png',
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  activeSubscription: {
    type: Schema.Types.ObjectId,
    ref: 'Subscription',
  },
  resetCode: {
    value: Number,
    expiresAt: Date,
    createdAt: Date,
    _id: false,
  },
  resetPasswordUid: String,
}, { timestamps: true });

const User = model<IUser>('User', usersSchema);
export default User;
