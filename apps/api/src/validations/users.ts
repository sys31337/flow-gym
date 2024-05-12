import Joi from 'joi';
import expressJoiValidation from 'express-joi-validation';
import { string } from './schema';

const validator = expressJoiValidation.createValidator({ passError: true });

const existanceSchema = Joi.object({
  email: string.required(),
});

const loginSchema = Joi.object({
  email: string.required(),
  password: string.required(),
});

const userCreateSchema = Joi.object({
  firstName: string.required(),
  lastName: string.required(),
  email: string.required(),
  password: string.required(),
  confirm: string.required(),
});

export const userCreateValidator = validator.body(userCreateSchema);
export const loginValidator = validator.body(loginSchema);
export const existanceValidator = validator.body(existanceSchema);
