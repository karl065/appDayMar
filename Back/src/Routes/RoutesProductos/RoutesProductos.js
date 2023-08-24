const express = require('express');
const {
  getHandlerProductos,
} = require('../../Handlers/HandlersProductos/getHandlerProductos');
const {
  postHandlerProductos,
} = require('../../Handlers/HandlersProductos/postHandlerProductos');
const {
  putHandlerProductos,
} = require('../../Handlers/HandlersProductos/putHandlerProductos');
const {
  deleteHandlerProducto,
} = require('../../Handlers/HandlersProductos/deleteHandlerProductos');
const router = express.Router();

router.post('/', postHandlerProductos);
router.get('/', getHandlerProductos);
router.put('/:id', putHandlerProductos);
router.delete('/:id', deleteHandlerProducto);

module.exports = router;
