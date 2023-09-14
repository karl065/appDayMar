const express = require('express');
const {
  postHandlerUsuarios,
} = require('../../Handlers/HandlersUsuarios/postHandlerUsuarios');
const {
  getHandleUsuarios,
} = require('../../Handlers/HandlersUsuarios/getHandlerUsuarios');
const {
  putHandlerUsuarios,
} = require('../../Handlers/HandlersUsuarios/putHandlerUsuarios');
const {
  deleteHandlerUsuario,
} = require('../../Handlers/HandlersUsuarios/deleteHandlerUsuario');
const router = express.Router();

router.post('/', postHandlerUsuarios);
router.get('/', getHandleUsuarios);
router.put('/:id', putHandlerUsuarios);
router.delete('/:id', deleteHandlerUsuario);

module.exports = router;
