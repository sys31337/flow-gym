import Joi from 'joi';
import expressJoiValidation from 'express-joi-validation';
import { mongooseId, number, string } from './schema';

const validator = expressJoiValidation.createValidator({ passError: true });

const createAccountSchema = Joi.object({
  firstname: string.required(),
  lastname: string.required(),
  email: string.required(),
  password: string,
});

const updateUserSchema = Joi.object({
  email: string,
  fullname: string,
  profile_picture: string,
  business_name: string,
  username: string,
  password: string,
});
const resetPasswordSchema = Joi.object({ email: string.required() });
const setNewPasswordSchema = Joi.object({
  email: string.required(),
  password: string.required(),
});

const getResetCodeInfoSchema = Joi.object({
  token: string.required(),
  code: string.required(),
});

const userIdSchema = Joi.object({ id: mongooseId.required() });

const createOneByAdminSchema = Joi.object({
  firstname: string.required(),
  lastname: string.required(),
  email: string.required(),
  botsAvailable: number.required(),
  password: string.required(),
});

export const createAccountValidator = validator.body(createAccountSchema);
export const updateUserValidator = validator.body(updateUserSchema);
export const resetPasswordValidator = validator.body(resetPasswordSchema);
export const setNewPasswordValidator = validator.body(setNewPasswordSchema);
export const createOneByAdminValidator = validator.body(createOneByAdminSchema);
export const getResetCodeInfoValidator = validator.params(getResetCodeInfoSchema);
export const userIdValidator = validator.params(userIdSchema);
