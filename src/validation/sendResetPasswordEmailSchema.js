import Joi from 'joi';

export const sendResetPasswordEmailSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.base': 'Email should be a string',
    'any.required': 'Field Email should be required',
  }),
});
