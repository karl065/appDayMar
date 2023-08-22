const {Usuarios} = require('../../DB.js');

const postUsuarios = async (
  nombre,
  direccion,
  celular,
  email,
  password,
  rol
) => {
  try {
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
