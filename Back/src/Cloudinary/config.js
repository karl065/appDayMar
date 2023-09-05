const cloudinary = require('cloudinary').v2;
const {CLOUDINARY_NAME, CLOUDINARY_KEY, CLOUDINARY_SECRET} = process.env;

// Configure your cloud name, API key and API secret:

const myConfig = cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_KEY,
  api_secret: CLOUDINARY_SECRET,
  secure: true,
});

exports.myConfig = myConfig;
