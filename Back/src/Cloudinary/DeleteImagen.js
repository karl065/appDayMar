const cloudinary = require('cloudinary').v2;
require('./config');

const deleteImagen = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    return error.message;
  }
};

module.exports = {deleteImagen};
