const {Categorias} = require('../../DB.js');

const putControllerCategory = async (updateData, idCategoria) => {
  try {
    await Categorias.update(updateData, {
      where: {idCategoria},
    });
    const category = await Categorias.findByPk(idCategoria);
    return category;
  } catch (error) {
    return error;
  }
};

module.exports = {
  putControllerCategory,
};
