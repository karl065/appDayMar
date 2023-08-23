const {Pedidos, Productos} = require('../../DB.js');

const agregarProdAlPedidos = async (idPedido, idProducto, cant) => {
  try {
    // Inicia una transacción para garantizar la consistencia de los datos
    const t = await Pedidos.sequelize.transaction();

    const pedidos = await Pedidos.findByPk(idPedido, {transaction: t});
    const producto = await Productos.findByPk(idProducto, {transaction: t});
    const precioPorCant = producto.precioVenta * cant;

    await pedidos.addProductos(producto, {
      through: {
        cant,
        precioPorUnd: producto.precioVenta,
        precioPorCant,
      },
      transaction: t,
    });

    const productosEnPedidos = await pedidos.getProductos({transaction: t});
    const total = productosEnPedidos.reduce((tot, product) => {
      return tot + product.PedidosProductos.precioPorCant;
    }, 0);

    await pedidos.update(
      {cantProd: productosEnPedidos.length, total},
      {transaction: t}
    );

    await t.commit(); // Confirma la transacción

    // Ordena los productos por orden alfabético según el nombre
    const pedidosActualizado = await Pedidos.findByPk(idPedido, {
      include: [
        {
          model: Productos,
          through: {
            attributes: ['cant', 'precioPorUnd', 'precioPorCant'],
          },
        },
      ],
    });

    pedidosActualizado.Productos.sort((a, b) =>
      a.nombre.localeCompare(b.nombre)
    );

    return pedidosActualizado;
  } catch (error) {
    return error.message;
  }
};

module.exports = {agregarProdAlPedidos};
