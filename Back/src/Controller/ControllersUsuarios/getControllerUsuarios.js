const {Usuarios, Productos} = require('../../DB.js');

const getUsuarios = async () => {
  return await Usuarios.findAll({
    include: [Productos],
  });
};

const getUsuarioId = async (id) => {
  return await Usuarios.findByPk(id, {
    include: [Productos],
  });
};

module.exports = {getUsuarios, getUsuarioId};
