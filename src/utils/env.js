import dotenv from 'dotenv';

dotenv.config();

export const env = (portName, defaultValue) => {
  const value = process.env[portName];

  if (value) return value;
  if (defaultValue) return defaultValue;
  throw new Error(`Missing: process.env['${portName}'].`);
};
