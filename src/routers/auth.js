import express from 'express';
import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { createUserController } from '../controllers/auth.js';
import { createUserSchema } from '../validation/createUserSchema.js';

const router = Router();
const parsedJson = express.json();

router.post(
  '/register',
  parsedJson,
  validateBody(createUserSchema),
  ctrlWrapper(createUserController),
);

export default router;
