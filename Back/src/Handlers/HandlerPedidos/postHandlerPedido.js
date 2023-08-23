const {
  agregarProdAlPedidos,
} = require('../../Controller/ControllersPedidos/postControllerPedidos');

const postHandlerPedidos = async (req, res) => {
  const {idPedido, idProducto, cant} = req.body;
  try {
    const pedido = await agregarProdAlPedidos(idPedido, idProducto, cant);
    return res.status(200).json(pedido);
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
};

module.exports = {postHandlerPedidos};
