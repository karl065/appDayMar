const {
  delProdPedidos,
  delAllPedidos,
} = require('../../Controller/ControllersPedidos/deleteControllerPedidos');

const delHandlerPedidos = async (req, res) => {
  const {idPedido, idProducto} = req.params;
  try {
    const pedido = await delProdPedidos(idPedido, idProducto);
    return res.status(200).json(pedido);
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
};
const delHandlerAllPedidos = async (req, res) => {
  const {idPedido} = req.params;
  try {
    const pedido = await delAllPedidos(idPedido);
    return res.status(200).json(pedido);
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
};

module.exports = {delHandlerPedidos, delHandlerAllPedidos};
