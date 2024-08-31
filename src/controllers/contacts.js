import * as fs from 'node:fs/promises';
import createHttpError from 'http-errors';
import {
  deleteContact,
  getAllContacts,
  getContactById,
  patchContact,
  postContact,
} from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { uploadToCloudinary } from '../utils/uploadToCloudinary.js';

export const getAllContactsController = async (req, res, next) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const { type, isFavourite } = parseFilterParams(req.query);
  const userId = req.user._id;

  const contacts = await getAllContacts(
    page,
    perPage,
    sortBy,
    sortOrder,
    type,
    isFavourite,
    userId,
  );

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const userId = req.user._id;
  const contact = await getContactById(contactId, userId);

  if (!contact) {
    return next(createHttpError(404, 'Contact not found'));
  }

  res.json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

export const postContactController = async (req, res, next) => {
  const body = req.body;
  const userId = req.user._id;
  let photo = null;

  if (typeof req.file !== undefined) {
    const result = await uploadToCloudinary(req.file.path);
    await fs.unlink(req.file.path);
    photo = result.secure_url;
  }

  const contact = await postContact(body, userId, photo);

  res.json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
};

export const deleteContactByIdController = async (req, res, next) => {
  const id = req.params.contactId;
  const userId = req.user._id;
  const contact = await deleteContact(id, userId);

  if (!contact) {
    return next(createHttpError(404, 'Contact not found'));
  }

  res.status(204).end();
};

export const patchContactController = async (req, res, next) => {
  const id = req.params.contactId;
  const body = req.body;
  const userId = req.user._id;
  let photoUrl = null;

  if (typeof req.file !== undefined) {
    const result = await uploadToCloudinary(req.file.path);
    await fs.unlink(req.file.path);
    photoUrl = result.secure_url;
  }

  const contact = await patchContact(id, userId, body, photoUrl);

  if (!contact) {
    return next(createHttpError(404, 'Contact not found'));
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: contact,
  });
};
