import createHttpError from 'http-errors';
import { UsersCollection } from '../db/models/users.js';
import bcrypt from 'bcrypt';
import { randomBytes } from 'node:crypto';
import { SessionsCollection } from '../db/models/sessions.js';
import { FIFTEEN_MINUTES, ONE_MONTH } from '../constants/constants.js';

export const registerUser = async (payload) => {
  const existedEmail = await UsersCollection.findOne({ email: payload.email });

  if (existedEmail) {
    throw createHttpError(409, 'Email in use');
  }
  const hashedPassword = await bcrypt.hash(payload.password, 10);

  return await UsersCollection.create({
    ...payload,
    password: hashedPassword,
  });
};

export const loginUser = async (payload) => {
  const existedUser = await UsersCollection.findOne({
    email: payload.email,
  });
  if (!existedUser) {
    throw createHttpError(401, 'User not found');
  }

  const existedPassword = await bcrypt.compare(
    payload.password,
    existedUser.password,
  );

  if (existedPassword === false) {
    throw createHttpError(401, 'Unauthorized');
  }

  await SessionsCollection.deleteOne({ userId: existedUser._id });

  const accessToken = randomBytes(20).toString('base64');
  const refreshToken = randomBytes(20).toString('base64');

  return await SessionsCollection.create({
    userId: existedUser._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + ONE_MONTH),
  });
};
