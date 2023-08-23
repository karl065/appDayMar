const {
  delHandlerPedidos,
  delHandlerAllPedidos,
} = require('../../Handlers/HandlerPedidos/deleteHandlerPedido');
const {
  getHandlerPedidos,
  getHandlerPedidosID,
} = require('../../Handlers/HandlerPedidos/getHandlerPedido');
const {
  postHandlerPedidos,
} = require('../../Handlers/HandlerPedidos/postHandlerPedido');
const {
  putHandlerPedidos,
} = require('../../Handlers/HandlerPedidos/putHandlerPedido');

const router = require('express').Router();

router.get('/', getHandlerPedidos);
router.get('/:id', getHandlerPedidosID);
router.post('/', postHandlerPedidos);
router.put('/', putHandlerPedidos);
router.delete('/:idPedido/:idProducto', delHandlerPedidos);
router.delete('/:idPedido', delHandlerAllPedidos);

module.exports = router;
