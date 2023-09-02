const {Usuarios, Productos} = require('../../DB.js');

const putUsuarios = async (updateData, idUser) => {
  try {
    await Usuarios.update(updateData, {
      where: {idUser},
    });
    const usuario = await Usuarios.findByPk(idUser, {
      include: [Productos],
    });
    return usuario;
  } catch (error) {
    return error.message;
  }
};

module.exports = {putUsuarios};
