import { Schema, model, models } from 'mongoose';
import type { Club } from '@repo/types/club';
import { customAlphabet } from 'nanoid';

const clubSchema = new Schema<Club>({
  uid: {
    type: Number,
    unique: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  isTrial: {
    type: Boolean,
    default: true,
  },
  name: {
    type: String,
    required: true,
  },
  tagline: {
    type: String,
    required: true,
  },
  gps: {
    longitude: String,
    latitude: String,
  },
  logo: {
    type: String,
    default: 'assets/logos/default.png',
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

clubSchema.pre('save', async function d(next) {
  let duplicated = true;
  if (this.uid) {
    const exists = await models.Club.findOne({ uid: this.uid });
    if (exists) next(new Error('UID Already in use'));
    if (!exists) next();
  }
  let uid = 0;
  while (duplicated) {
    const randomNumber = customAlphabet('1234567890', 8);
    uid = Number(randomNumber());
    // eslint-disable-next-line no-await-in-loop
    const isDuplicated = await models.Club.findOne({ uid });
    if (!isDuplicated) duplicated = false;
  }
  this.uid = uid;
  next();
});

const Club = model<Club>('Club', clubSchema);
export default Club;
