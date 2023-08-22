const express = require('express');
const {
  getHandlerProductos,
  getHandlerProductosID,
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
router.get('/:id', getHandlerProductosID);
router.put('/:id', putHandlerProductos);
router.delete('/:id', deleteHandlerProducto);

module.exports = router;
