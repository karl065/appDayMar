const {Ventas, Usuarios, Productos} = require('../../DB.js');

const crearVenta = async (status, cantProd, total, idUser, Producto) => {
  try {
    const newVenta = await Ventas.create({
      cantProd,
      total,
      status,
      idUser,
    });
    for (const prod of Producto) {
      await newVenta.addProductos(prod, {
        through: {
          cant: prod.PedidosProductos.cant,
          precioPorUnd: prod.PedidosProductos.precioPorUnd,
          precioPorCant: prod.PedidosProductos.precioPorCant,
        },
      });
    }
    const venta = Ventas.findByPk(newVenta.dataValues.idVenta, {
      include: [
        {
          model: Usuarios,
          as: 'usuario',
        },
        {model: Productos},
      ],
    });
    return venta;
  } catch (error) {
    return error.message;
  }
};

module.exports = {crearVenta};
