import { Contact } from '../db/models/contacts.js';

export const getAllContacts = async (
  page,
  perPage,
  sortBy,
  sortOrder,
  type,
  isFavourite,
) => {
  const skip = page > 0 ? (page - 1) * perPage : 0;

  const contactQuery = Contact.find();

  if (type !== undefined) {
    contactQuery.where('contactType').equals(type);
  }

  if (isFavourite !== undefined) {
    contactQuery.where('isFavourite').equals(isFavourite);
  }

  const [totalItems, data] = await Promise.all([
    Contact.countDocuments(contactQuery),
    contactQuery
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(perPage),
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
