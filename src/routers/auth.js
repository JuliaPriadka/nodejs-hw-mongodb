import express from 'express';
import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  createUserController,
  loginUserController,
  logoutUserController,
} from '../controllers/auth.js';
import { createUserSchema } from '../validation/createUserSchema.js';
import { loginUserSchema } from '../validation/loginUserSchema.js';

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

router.post('/logout', ctrlWrapper(logoutUserController));

export default router;
