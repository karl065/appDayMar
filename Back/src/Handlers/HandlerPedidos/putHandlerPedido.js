const putHandlerPedidos = async (req, res) => {
  try {
    const {userId, localCart} = req.body;
    const pedido = await mergeWithLocalPedido(userId, localCart);
    return res.status(200).json(pedido);
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
};

module.exports = {putHandlerPedidos};
