import Joi from 'joi';

export const patchContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).messages({
    'string.base': 'Name should be a string',
    'string.min': 'Name should have at least {#limit} characters',
    'string.max': 'Name should have not more than {#limit} characters',
  }),
  phoneNumber: Joi.string().min(3).max(20).messages({
    'string.base': 'Phone number should be a string',
    'string.min': 'Phone number should have at least {#limit} characters',
    'string.max': 'Phone number should have not more than {#limit} characters',
  }),
  email: Joi.string().email().messages({
    'string.base': 'Email should be a string',
  }),
  isFavourite: Joi.boolean().messages({
    'boolean.base': 'Is Favourite should be boolean type',
  }),
  contactType: Joi.string().valid('work', 'home', 'personal').messages({
    'string.base': 'Contact type should be a string',
    'any.only': 'Contact type should be:work, home or personal',
  }),
});
