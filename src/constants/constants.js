import { env } from '../utils/env.js';

export const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
};

export const CONTACT_TYPE = {
  WORK: 'work',
  HOME: 'home',
  PERSONAL: 'personal',
};

export const FIFTEEN_MINUTES = 1000 * 60 * 15;

export const ONE_MONTH = 1000 * 60 * 60 * 24 * 30;

export const SMTP = {
  HOST: env('SMTP_HOST'),
  PORT: Number(env('SMTP_PORT')),
  USER: env('SMTP_USER'),
  PASSWORD: env('SMTP_PASSWORD'),
  FROM: env('SMTP_FROM'),
};

export const SECRET = env('JWT_SECRET');

export const DOMAIN = env('APP_DOMAIN');

export const CLOUDINARY = {
  NAME: env('CLOUDINARY_NAME'),
  KEY: env('CLOUDINARY_KEY'),
  SECRET: env('CLOUDINARY_SECRET'),
};
