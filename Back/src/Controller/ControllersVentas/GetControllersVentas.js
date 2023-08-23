const {Ventas, Usuarios, Productos} = require('../../DB.js');

const getAllVentasController = async () => {
  try {
    const ventas = await Ventas.findAll({
      include: [
        {
          model: Usuarios,
          as: 'usuario',
        },
        {model: Productos},
      ],
    });
    return ventas;
  } catch (error) {
    return error.message;
  }
};

const getVentasIdController = async (idVenta) => {
  try {
    const venta = await Ventas.findByPk(idVenta, {
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

module.exports = {getAllVentasController, getVentasIdController};
