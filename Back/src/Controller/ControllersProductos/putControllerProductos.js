const {Productos} = require('../../DB.js');

const putProductos = async (updateData, id) => {
  try {
    await Productos.update(updateData, {
      where: {id},
    });
    const producto = await Productos.findByPk(id);
    return producto;
  } catch (error) {
    return error.message;
  }
};

module.exports = {putProductos};
