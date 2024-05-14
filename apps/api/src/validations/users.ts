import Joi from 'joi';
import expressJoiValidation from 'express-joi-validation';
import { string } from './schema';

const validator = expressJoiValidation.createValidator({ passError: true });

const existanceSchema = Joi.object({
  email: string.required(),
});

const userCreateSchema = Joi.object({
  fullname: string.required(),
  email: string.required(),
  password: string.required(),
  confirm: string.required(),
});

const providerAuthenticateSchema = Joi.object({
  displayName: string,
  email: string.required(),
  avatar: string,
  firebaseId: string.required(),
  authProvider: string.required(),
});

export const userCreateValidator = validator.body(userCreateSchema);
export const existanceValidator = validator.body(existanceSchema);
export const providerAuthenticateValidator = validator.body(providerAuthenticateSchema);
