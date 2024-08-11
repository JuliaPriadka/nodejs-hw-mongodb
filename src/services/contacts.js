import { Contact } from '../db/models/contacts.js';

export const getAllContacts = async (page, perPage) => {
  const skip = page > 0 ? (page - 1) * perPage : 0;

  const [totalItems, data] = await Promise.all([
    Contact.countDocuments(),
    Contact.find().skip(skip).limit(perPage),
  ]);

  const totalPages = Math.ceil(totalItems / perPage);

  return {
    data,
    page,
    perPage,
    totalItems,
    totalPages,
    hasPreviousPage: page > 1,
    hasNextPage: page < totalPages,
  };
};

export const getContactById = (contactId) => {
  return Contact.findById(contactId);
};

export const postContact = (payload) => {
  return Contact.create(payload);
};

export const deleteContact = (contactId) => {
  return Contact.findByIdAndDelete(contactId);
};

export const patchContact = (contactId, payload) => {
  return Contact.findByIdAndUpdate(contactId, payload, { new: true });
};
