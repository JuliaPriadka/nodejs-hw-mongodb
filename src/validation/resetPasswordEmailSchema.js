import Joi from 'joi';

export const resetPasswordEmailSchema = Joi.object({
  password: Joi.string().min(3).max(10).required().messages({
    'string.base': 'Password should be a string',
    'string.min': 'Password should have at least {#limit} characters',
    'string.max': 'Password should have not more than {#limit} characters',
    'any.required': 'Field Password should be required',
  }),
  token: Joi.string().required().messages({
    'string.base': 'Token should be a string',
    'any.required': 'Field Token should be required',
  }),
});
