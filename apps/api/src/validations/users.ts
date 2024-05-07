import Joi from 'joi';
import expressJoiValidation from 'express-joi-validation';
import { string } from './schema';

const validator = expressJoiValidation.createValidator({ passError: true });

const userCreateSchema = Joi.object({
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  confirm: string,
});

export const userCreateValidator = validator.body(userCreateSchema);
export const holder = '';
