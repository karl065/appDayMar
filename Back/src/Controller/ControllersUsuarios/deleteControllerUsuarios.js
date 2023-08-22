const {Usuarios} = require('../../DB.js');

const deleteUsuario = async (id) => {
  try {
    const usuario = await Usuarios.findByPk(id);
    await usuario.destroy({where: {id}});
    return usuario;
  } catch (error) {
    return error.message;
  }
};

module.exports = {deleteUsuario};
