import createHttpError from 'http-errors';
import { SessionsCollection } from '../db/models/sessions.js';
import { UsersCollection } from '../db/models/users.js';

export const authenticate = async (req, res, next) => {
  const authHeader = req.header('Authorization');

  const [bearer, token] = authHeader.split(' ');

  if (!authHeader) {
    return next(createHttpError(401, 'Please provide Authorization header'));
  }

  if (bearer !== 'Bearer' || !token) {
    return next(createHttpError(401, 'Auth header should be of Bearer type'));
  }

  const session = await SessionsCollection.findOne({ accessToken: token });

  if (!session) {
    return next(createHttpError(401, 'Session not found'));
  }

  if (new Date() > new Date(session.accessToken)) {
    return next(createHttpError(401, 'Access token expired'));
  }

  const user = await UsersCollection.findOne({ _id: session.userId });

  req.user = user;

  next();
};
