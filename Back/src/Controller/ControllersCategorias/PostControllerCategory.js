const {Categorias} = require('../../DB');

const crearCategoria = async (nombreCategoria, descripcion, status) => {
  try {
    const newCategory = await Categorias.create({
      nombreCategoria,
      descripcion,
      status,
    });
    return newCategory;
  } catch (error) {
    return error;
  }
};

module.exports = {crearCategoria};
