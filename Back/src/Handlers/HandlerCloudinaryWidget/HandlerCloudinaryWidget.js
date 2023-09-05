const {deleteImagen} = require('../../Cloudinary/DeleteImagen');
const {signUploadWidget} = require('../../Cloudinary/signUploadWidget');

require('../../Cloudinary/config');

const cloudinary = require('cloudinary').v2;
const cloudName = cloudinary.config().cloud_name;
const apiKey = cloudinary.config().api_key;

const handlerCloudinaryWidget = (req, res, next) => {
  try {
    const sig = signUploadWidget();
    return res.status(200).json({
      signature: sig.signature,
      timestamp: sig.timestamp,
      cloudName,
      apiKey,
    });
  } catch (error) {}
};

const handlerDeleteImagen = async (req, res) => {
  try {
    const {publicId} = req.body;
    const response = await deleteImagen(publicId);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({error: error});
  }
};

module.exports = {handlerCloudinaryWidget, handlerDeleteImagen};
