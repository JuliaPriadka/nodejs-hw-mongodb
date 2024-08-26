import { Router } from 'express';
import express from 'express';
import {
  deleteContactByIdController,
  getAllContactsController,
  getContactByIdController,
  patchContactController,
  postContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createContactSchema } from '../validation/createContactSchema.js';
import { patchContactSchema } from '../validation/patchContactSchema.js';
import { isValidId } from '../middlewares/isValidId.js';
import { upload } from '../middlewares/upload.js';

const router = Router();
const parsedJson = express.json();

router.get('/', ctrlWrapper(getAllContactsController));

router.get('/:contactId', isValidId, ctrlWrapper(getContactByIdController));

router.post(
  '/',
  parsedJson,
  upload.single('photo'),
  validateBody(createContactSchema),
  ctrlWrapper(postContactController),
);

router.delete(
  '/:contactId',
  isValidId,
  ctrlWrapper(deleteContactByIdController),
);

router.patch(
  '/:contactId',
  parsedJson,
  upload.single('photo'),
  validateBody(patchContactSchema),
  isValidId,
  ctrlWrapper(patchContactController),
);

export default router;
