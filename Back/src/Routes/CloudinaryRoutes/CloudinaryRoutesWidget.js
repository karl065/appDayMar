const express = require('express');
const {
  handlerCloudinaryWidget,
  handlerDeleteImagen,
} = require('../../Handlers/HandlerCloudinaryWidget/HandlerCloudinaryWidget');
const router = express.Router();

router.get('/', handlerCloudinaryWidget);
router.post('/', handlerDeleteImagen);

module.exports = router;
