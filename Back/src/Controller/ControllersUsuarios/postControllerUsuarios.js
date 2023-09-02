const {Usuarios} = require('../../DB.js');
const bcryptjs = require('bcryptjs');

const postUsuarios = async (
  nombre,
  direccion,
  celular,
  email,
  password,
  rol
) => {
  try {
    password = await bcryptjs.hash(password, 10);
    const usuario = await Usuarios.create({
      nombre,
      direccion,
      celular,
      email,
      password,
      rol,
    });
    return usuario;
  } catch (error) {
    return error.message;
  }
};

module.exports = {postUsuarios};
