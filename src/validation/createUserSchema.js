import Joi from 'joi';

export const createUserSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Name should be a string',
    'string.min': 'Name should have at least {#limit} characters',
    'string.max': 'Name should have not more than {#limit} characters',
    'any.required': 'Field Name should be required',
  }),
  email: Joi.string().email().required().messages({
    'string.base': 'Email should be a string',
    'any.required': 'Field Email should be required',
  }),
  password: Joi.string().min(3).max(10).required().messages({
    'string.base': 'Password should be a string',
    'string.min': 'Password should have at least {#limit} characters',
    'string.max': 'Password should have not more than {#limit} characters',
    'any.required': 'Field Password should be required',
  }),
});
