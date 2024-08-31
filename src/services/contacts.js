import { Contact } from '../db/models/contacts.js';

export const getAllContacts = async (
  page,
  perPage,
  sortBy,
  sortOrder,
  type,
  isFavourite,
  userId,
) => {
  const skip = page > 0 ? (page - 1) * perPage : 0;

  const contactQuery = Contact.find();

  if (type !== undefined) {
    contactQuery.where('contactType').equals(type);
  }

  if (isFavourite !== undefined) {
    contactQuery.where('isFavourite').equals(isFavourite);
  }

  contactQuery.where('userId').equals(userId);

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

export const getContactById = (contactId, userId) => {
  return Contact.findOne({ _id: contactId, userId });
};

export const postContact = (payload, userId, photo) => {
  return Contact.create({ photo, userId, ...payload });
};

export const deleteContact = (contactId, userId) => {
  return Contact.findOneAndDelete({ _id: contactId, userId });
};

export const patchContact = (contactId, userId, payload, photoUrl) => {
  return Contact.findOneAndUpdate(
    { _id: contactId, userId },
    { ...payload, photo: photoUrl },
    {
      new: true,
    },
  );
};
