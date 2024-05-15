import { Schema, model } from 'mongoose';
import type { Club } from '@repo/types/club';

const clubSchema = new Schema<Club>({
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

const Club = model<Club>('Club', clubSchema);
export default Club;
