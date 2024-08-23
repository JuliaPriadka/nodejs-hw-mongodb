import { ONE_MONTH } from '../constants/constants.js';
import {
  loginUser,
  registerUser,
  logoutUser,
  refreshUser,
  sendResetPasswordEmail,
  resetPassword,
} from '../services/auth.js';

const setupCookies = (res, session) => {
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_MONTH),
  });

  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_MONTH),
  });
};

export const createUserController = async (req, res, next) => {
  const user = await registerUser(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: user,
  });
};

export const loginUserController = async (req, res, next) => {
  const session = await loginUser(req.body);

  setupCookies(res, session);

  res.status(200).json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: { accessToken: session.accessToken },
  });
};

export const logoutUserController = async (req, res, next) => {
  const { sessionId } = req.cookies;

  if (sessionId) {
    await logoutUser(sessionId);
  }

  res.clearCookie('sessionId');

  res.clearCookie('refreshToken');

  res.status(204).send();
};

export const refreshUserController = async (req, res, next) => {
  const { sessionId, refreshToken } = req.cookies;

  const session = await refreshUser(sessionId, refreshToken);

  setupCookies(res, session);

  res.status(200).json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: { accessToken: session.accessToken },
  });
};

export const sendResetPasswordEmailController = async (req, res, next) => {
  const { email } = req.body;
  await sendResetPasswordEmail(email);
  res.status(200).send({
    status: 200,
    message: 'Reset password email has been successfully sent.',
    data: {},
  });
};

export const resetPasswordController = async (req, res, next) => {
  const { password, token } = req.body;
  await resetPassword(password, token);
  res.status(200).send({
    status: 200,
    message: 'Password has been successfully reset.',
    data: {},
  });
};
