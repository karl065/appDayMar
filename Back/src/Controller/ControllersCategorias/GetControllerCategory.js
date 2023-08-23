const {Categorias, Productos} = require('../../DB');

const getAllCategory = async () => {
  try {
    return await Categorias.findAll({
      include: {
        model: Productos,
        as: 'productos',
      },
    });
  } catch (error) {
    return error;
  }
};

const getCategoryID = async (id) => {
  try {
    return await Categorias.findByPk(id, {
      include: {
        model: Productos,
        as: 'productos',
      },
    });
  } catch (error) {
    return error;
  }
};

const getCategoryByName = async (nombreCategoria) => {
  try {
    const category = await Categorias.findAll({
      where: {nombreCategoria},
      include: {
        model: Productos,
        as: 'productos',
      },
    });
    return category;
  } catch (error) {
    return error;
  }
};

const getCategoryByStatus = async (status) => {
  try {
    return await Categorias.findAll({
      where: {status},
      include: {
        model: Productos,
        as: 'productos',
      },
    });
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAllCategory,
  getCategoryByName,
  getCategoryByStatus,
  getCategoryID,
};
