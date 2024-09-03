import nodemailer from 'nodemailer';
import { SMTP } from '../constants/constants.js';

const transporter = nodemailer.createTransport({
  host: SMTP.HOST,
  port: SMTP.PORT,
  auth: {
    user: SMTP.USER,
    pass: SMTP.PASSWORD,
  },
});

export const sendEmail = (message) => {
  return transporter.sendMail(message);
};
