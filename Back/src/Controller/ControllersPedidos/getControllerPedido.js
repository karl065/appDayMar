const {Pedidos, Usuarios, Productos} = require('../../DB');

const getAllPedidos = async () => {
  try {
    return await Pedidos.findAll({
      include: [
        {
          model: Usuarios,
          as: 'usuario',
        },
        {
          model: Productos,
          through: {
            attributes: ['cant', 'precioPorUnd', 'precioPorCant'],
          },
        },
      ],
    });
  } catch (error) {
    throw error;
  }
};

const getPedidosID = async (id) => {
  try {
    const carrito = await Pedidos.findByPk(id, {
      include: [
        {
          model: Usuarios,
          as: 'usuario',
        },
        {
          model: Productos,
          through: {
            attributes: ['id', 'cant', 'precioPorUnd', 'precioPorCant'],
          },
        },
      ],
    });

    if (!carrito) throw new Error('Pedidos no encontrado');

    return carrito;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllPedidos,
  getPedidosID,
};
