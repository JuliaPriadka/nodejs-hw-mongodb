import createHttpError from 'http-errors';
import Joi from 'joi';

export const validateBody = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    return next(createHttpError(400, 'Bad request', { error: error.details }));
  }
};
