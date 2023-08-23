const {
  getAllPedidos,
  getPedidosID,
} = require('../../Controller/ControllersPedidos/getControllerPedido');

const getHandlerPedidos = async (req, res) => {
  try {
    const pedidos = await getAllPedidos();
    pedidos.forEach((pedido) => {
      pedido.Productos.sort((a, b) => a.nombre.localeCompare(b.nombre));
    });
    return res.status(200).json(pedidos);
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
};

const getHandlerPedidosID = async (req, res) => {
  const {id} = req.params;
  try {
    const pedido = await getPedidosID(id);
    return res.status(200).json(pedido);
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
};

module.exports = {getHandlerPedidos, getHandlerPedidosID};
