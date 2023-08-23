const {Pedidos, Productos} = require('../../DB.js');

const delProdPedidos = async (idPedido, idProducto) => {
  try {
    const pedido = await Pedidos.findByPk(idPedido);
    const producto = await Productos.findByPk(idProducto);

    await pedido.removeProductos(producto);

    const productosEnPedidos = await pedido.getProductos();
    const total = productosEnPedidos.reduce((tot, product) => {
      return tot + product.PedidosProductos.precioPorCant;
    }, 0);
    await pedido.update({cantProd: productosEnPedidos.length, total});

    const pedidoActualizado = await Pedidos.findByPk(idPedido, {
      include: [
        {
          model: Productos,
          through: {
            attributes: ['cant', 'precioPorUnd', 'precioPorCant'],
          },
        },
      ],
    });

    return pedidoActualizado;
  } catch (error) {
    return error.message;
  }
};

const delAllPedidos = async (idPedido) => {
  const pedido = await Pedidos.findByPk(idPedido);
  pedido.setProductos([]);
  await Pedidos.update({cantProd: 0, total: 0}, {where: {idPedido}});
  const pedidoActualizado = await Pedidos.findByPk(idPedido, {
    include: [
      {
        model: Productos,
        through: {
          attributes: ['cant', 'precioPorUnd', 'precioPorCant'],
        },
      },
    ],
  });

  return pedidoActualizado;
};

module.exports = {delProdPedidos, delAllPedidos};
