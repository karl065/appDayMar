const {Productos} = require('../../DB.js');

const getProductos = async () => {
  const productos = await Productos.findAll();
  return productos;
};

const getProductosID = async (id) => {
  const producto = await Productos.findByPk(id);
  return producto;
};

const getProductosName = async (nombre) => {
  const producto = await Productos.findAll({
    where: {
      nombre: nombre,
    },
  });
  return producto;
};

module.exports = {getProductos, getProductosID, getProductosName};
