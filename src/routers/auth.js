import express from 'express';
import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  createUserController,
  loginUserController,
  logoutUserController,
  refreshUserController,
  sendResetPasswordEmailController,
  resetPasswordController,
} from '../controllers/auth.js';
import { createUserSchema } from '../validation/createUserSchema.js';
import { loginUserSchema } from '../validation/loginUserSchema.js';
import { sendResetPasswordEmailSchema } from '../validation/sendResetPasswordEmailSchema.js';
import { resetPasswordEmailSchema } from '../validation/resetPasswordEmailSchema.js';

const router = Router();
const parsedJson = express.json();

router.post(
  '/register',
  parsedJson,
  validateBody(createUserSchema),
  ctrlWrapper(createUserController),
);

router.post(
  '/login',
  parsedJson,
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);

router.post('/refresh', ctrlWrapper(refreshUserController));

router.post('/logout', ctrlWrapper(logoutUserController));

router.post(
  '/send-reset-email',
  parsedJson,
  validateBody(sendResetPasswordEmailSchema),
  ctrlWrapper(sendResetPasswordEmailController),
);

router.post(
  '/reset-pwd',
  parsedJson,
  validateBody(resetPasswordEmailSchema),
  ctrlWrapper(resetPasswordController),
);

export default router;
