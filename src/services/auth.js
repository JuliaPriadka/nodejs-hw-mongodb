import createHttpError from 'http-errors';
import { UsersCollection } from '../db/models/users.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { randomBytes } from 'node:crypto';
import { SessionsCollection } from '../db/models/sessions.js';
import {
  FIFTEEN_MINUTES,
  ONE_MONTH,
  SECRET,
  SMTP,
  DOMAIN,
} from '../constants/constants.js';
import { sendEmail } from '../utils/sendMail.js';
import { log } from 'node:console';

const createSession = () => {
  const accessToken = randomBytes(20).toString('base64');
  const refreshToken = randomBytes(20).toString('base64');

  return {
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + ONE_MONTH),
  };
};

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

  const newSession = createSession();

  return await SessionsCollection.create({
    userId: existedUser._id,
    ...newSession,
  });
};

export const logoutUser = async (sessionId) => {
  await SessionsCollection.deleteOne({ _id: sessionId });
};

export const refreshUser = async (sessionId, refreshToken) => {
  const existedSession = await SessionsCollection.findOne({
    _id: sessionId,
    refreshToken,
  });

  if (!existedSession) {
    throw createHttpError(401, 'Session not found');
  }

  if (new Date() > new Date(existedSession.refreshTokenValidUntil)) {
    throw createHttpError(401, 'Refresh Token isn`t valid');
  }

  await SessionsCollection.deleteOne({ _id: existedSession._id });

  const newSession = createSession();

  return await SessionsCollection.create({
    userId: existedSession.userId,
    ...newSession,
  });
};

export const sendResetPasswordEmail = async (email) => {
  const user = await UsersCollection.findOne({ email });

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const token = jwt.sign({ sub: user._id, email }, SECRET, { expiresIn: '5m' });

  try {
    await sendEmail({
      from: SMTP.FROM,
      to: email,
      subject: 'Reset password',
      html: `<p>If you want to reset your password please click the <a href="${DOMAIN}/reset-password?token=${token}">link</a></p>`, // html body
    });
  } catch (error) {
    throw createHttpError(
      500,
      'Failed to send the email, please try again later.',
    );
  }
};

export const resetPassword = async (password, token) => {
  try {
    const verifyToken = jwt.verify(token, SECRET);

    const user = await UsersCollection.findOne({
      _id: verifyToken.sub,
      email: verifyToken.email,
    });

    if (!user) {
      throw createHttpError(404, 'User not found!');
    }

    const newPassword = await bcrypt.hash(password, 10);

    await UsersCollection.findOneAndUpdate(
      { _id: user._id, email: user.email },
      { password: newPassword },
    );
  } catch (error) {
    if (
      error.name === 'TokenExpiredError' ||
      error.name === 'JsonWebTokenError'
    ) {
      throw createHttpError(401, 'Token is expired or invalid.');
    }
    throw error;
  }
};
