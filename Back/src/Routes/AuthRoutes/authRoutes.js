const express = require('express');
const {
  handlerAuthenticate,
} = require('../../Handlers/HandlerAuth/HandlerAuthenticate');
const {
  handlerAuthenticated,
} = require('../../Handlers/HandlerAuth/HandlerAuthenticated');
const {authMiddle} = require('../../Middleware/authMiddle');

const router = express.Router();

router.post('/', handlerAuthenticate);
router.get('/', authMiddle, handlerAuthenticated);

module.exports = router;
