import createHttpError from 'http-errors';
import { UsersCollection } from '../db/models/users.js';
import bcrypt from 'bcrypt';

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
