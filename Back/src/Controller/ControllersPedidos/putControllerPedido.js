const {Pedidos, Productos} = require('../../DB.js');

const mergeWithLocalPedido = async (idUser, localCart) => {
  try {
    // * Inicia una transacción para garantizar la consistencia de los datos
    const t = await Pedidos.sequelize.transaction();

    const pedidoUsuario = await Pedidos.findOne({
      where: {idUser},
      transaction: t,
    });

    const dispatchPromises = localCart.map(async (product) => {
      const inventoryProduct = await Productos.findByPk(product.idProducto, {
        transaction: t,
      });

      const precioPorCant = inventoryProduct.precioVenta * product.cant;

      await pedidoUsuario.addProductos(inventoryProduct, {
        through: {
          cant: product.cant,
          precioPorUnd: inventoryProduct.precioVenta,
          precioPorCant,
        },
        transaction: t,
      });
    });

    await Promise.all(dispatchPromises);

    const userProductsInCart = await pedidoUsuario.getProductos({
      transaction: t,
    });
    const total = userProductsInCart.reduce((tot, product) => {
      return tot + product.PedidosProductos.precioPorCant;
    }, 0);

    await pedidoUsuario.update(
      {cantProd: userProductsInCart.length, total},
      {transaction: t}
    );

    await t.commit();

    const pedido = await Pedidos.findByPk(pedidoUsuario.idPedido, {
      include: [
        {
          model: Productos,
          through: {
            attributes: ['cant', 'precioPorUnd', 'precioPorCant'],
          },
        },
      ],
    });
    return pedido;
  } catch (error) {
    throw error;
  }
};

module.exports = {mergeWithLocalPedido};
