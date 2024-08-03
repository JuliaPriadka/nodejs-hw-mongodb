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

const router = Router();
const parsedJson = express.json();

router.get('/contacts', ctrlWrapper(getAllContactsController));

router.get('/contacts/:contactId', ctrlWrapper(getContactByIdController));

router.post('/contacts', parsedJson, ctrlWrapper(postContactController));

router.delete('/contacts/:contactId', ctrlWrapper(deleteContactByIdController));

router.patch(
  '/contacts/:contactId',
  parsedJson,
  ctrlWrapper(patchContactController),
);

export default router;
