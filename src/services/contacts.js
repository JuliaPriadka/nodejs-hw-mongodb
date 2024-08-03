import { Contact } from '../db/models/contacts.js';

export const getAllContacts = () => {
  return Contact.find();
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
