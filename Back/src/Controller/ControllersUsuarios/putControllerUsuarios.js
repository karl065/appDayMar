const {Usuarios, Productos} = require('../../DB.js');

const putUsuarios = async (updateData, id) => {
  try {
    await Usuarios.update(updateData, {
      where: {id},
    });
    const usuario = await Usuarios.findByPk(id, {
      include: [Productos],
    });
    return usuario;
  } catch (error) {
    return error.message;
  }
};

module.exports = {putUsuarios};
