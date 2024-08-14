import { Types } from 'mongoose;'
import { Programs } from './program';
import { Club } from './club';

export interface Discipline extends Document {
  _id: Types.ObjectId;
  name: string;
  label: string;
  thumbnail: string;
  enabled: boolean;
  programs?: Programs[];
  clubId: Types.ObjectId[] | Club[];
}
