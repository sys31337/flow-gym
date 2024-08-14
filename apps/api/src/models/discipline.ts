import { model, Schema } from 'mongoose';
import type { Discipline } from '@repo/types/discipline';
import { GenderEnum, WeekDaysEnum, ADULTS } from '@api/constants/discipline';

const disciplineSchema = new Schema<Discipline>({
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  enabled: {
    type: Boolean,
    default: true,
  },
  clubId: { type: Schema.Types.ObjectId, ref: 'Club' },
  programs: [{
    day: {
      type: String,
      enum: WeekDaysEnum,
      required: true,
    },
    details: [{
      startTime: {
        type: String,
        required: true,
      },
      endTime: {
        type: String,
        required: true,
      },
      gender: {
        type: String,
        required: true,
        enum: GenderEnum,
      },
      ageCategories: {
        type: [{
          type: String,
        }],
        default: [ADULTS],
      },
      group: String,
    }],
  }],
}, { timestamps: true });

const Discipline = model<Discipline>('Discipline', disciplineSchema);
export default Discipline;
