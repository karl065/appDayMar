const {Productos, Usuarios, Categorias} = require('../../DB.js');

const getProductos = async () => {
  try {
    const productos = await Productos.findAll({
      include: [
        {
          model: Categorias,
          as: 'categorias',
        },
        {
          model: Usuarios,
        },
      ],
    });
    return productos;
  } catch (error) {
    return error;
  }
};

const getProductosID = async (id) => {
  try {
    const producto = await Productos.findByPk(id, {
      include: [
        {
          model: Categorias,
          as: 'categorias',
        },
        {
          model: Usuarios,
        },
      ],
    });
    return producto;
  } catch (error) {
    return error;
  }
};

const getProductosName = async (nombre) => {
  try {
    const producto = await Productos.findAll({
      where: {
        nombre: nombre,
      },
      include: [
        {
          model: Categorias,
          as: 'categorias',
        },
        {
          model: Usuarios,
        },
      ],
    });
    return producto;
  } catch (error) {
    return error;
  }
};

module.exports = {getProductos, getProductosID, getProductosName};
