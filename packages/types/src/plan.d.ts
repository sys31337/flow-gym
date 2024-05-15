import { Types, PopulatedDoc } from 'mongoose;'
import { Discipline } from './discipline';

export interface Plan extends Document {
  _id: string;
  label: string;
  daysPerWeek: number;
  price: number;
  disciplineId: [Types.ObjectId | PopulatedDoc<Discipline>];
  ageCategories: [string];
}