const {Categorias} = require('../../DB.js');

const deleteControllerCategory = async (idCategoria) => {
  try {
    const category = await Categorias.findByPk(idCategoria);
    await Categorias.destroy({where: {idCategoria}});
    return category;
  } catch (error) {
    return error;
  }
};

module.exports = {deleteControllerCategory};
