import cloudinary from 'cloudinary';
import { CLOUDINARY } from '../constants/constants.js';

cloudinary.v2.config({
  secure: true,
  cloud_name: CLOUDINARY.NAME,
  api_key: CLOUDINARY.KEY,
  api_secret: CLOUDINARY.SECRET,
});

export const uploadToCloudinary = (filePath) => {
  return cloudinary.v2.uploader.upload(filePath);
};
