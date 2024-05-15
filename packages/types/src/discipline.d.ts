import { Types, PopulatedDoc } from 'mongoose;'
import { Programs } from './program';
import { Club } from './club';
import { Plan } from './plan';

export interface Discipline extends Document {
  _id: Types.ObjectId;
  activityName: string;
  activityType: string;
  thumbnail: string;
  slotsLimit?: number;
  programs?: Programs[];
  planIds?: [Types.ObjectId | PopulatedDoc<Plan>]
  clubIds: Types.ObjectId[] | Club[];
}
