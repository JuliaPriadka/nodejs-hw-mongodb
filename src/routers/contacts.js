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

const router = Router();
const parsedJson = express.json();

router.get('/', ctrlWrapper(getAllContactsController));

router.get('/:contactId', isValidId, ctrlWrapper(getContactByIdController));

router.post(
  '/',
  parsedJson,
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
  validateBody(patchContactSchema),
  isValidId,
  ctrlWrapper(patchContactController),
);

export default router;
