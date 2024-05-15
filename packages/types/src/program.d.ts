import { Types, PopulatedDoc } from 'mongoose;'
import { Club } from './club';

interface Details {
  startTime?: string;
  endTime?: string;
  gender: string;
  ageCategories: string[];
  _id: Types.ObjectId
}

export interface Programs extends Document {
  _id: Types.ObjectId;
  clubId: Types.ObjectId[] | PopulatedDoc<Club>[];
  day: string;
  details: Details[];
}[]
