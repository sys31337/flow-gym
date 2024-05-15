import { ObjectId, PopulatedDoc } from 'mongoose';
import { User } from './user';

type GenderEnum = "MALE" | "FEMALE";

export interface Member extends Document {
  userId: ObjectId | PopulatedDoc<User>;
  age: number;
  birthdate: Date;
  weight: number;
  height: number;
  trainingFrequency: number;
  gender: GenderEnum
}