import Joi from 'joi';
import expressJoiValidation from 'express-joi-validation';
import { string } from './schema';

const validator = expressJoiValidation.createValidator({ passError: true });

const paramIdStringSchema = Joi.object({ id: string.required() });

const paramIdStringValidator = validator.params(paramIdStringSchema);

export default paramIdStringValidator;
