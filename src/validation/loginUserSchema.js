import Joi from 'joi';

export const loginUserSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.base': 'Email should be a strung',
    'any.required': 'Field Email should be required',
  }),
  password: Joi.string().min(3).max(10).required().messages({
    'string.base': 'Password should be a string',
    'string.min': 'Password should have at least {#limit} characters',
    'string.max': 'Password should have not more than {#limit} characters',
    'any.required': 'Field Password should be required',
  }),
});
