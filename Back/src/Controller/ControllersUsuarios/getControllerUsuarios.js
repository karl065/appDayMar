const {Usuarios, Productos} = require('../../DB.js');

const getUsuarios = async () => {
  return await Usuarios.findAll({
    include: [Productos],
  });
};

const getUsuariosFiltros = async (
  idUser,
  nombre,
  direccion,
  celular,
  email,
  rol
) => {
  try {
    const whereConditions = {};

    if (idUser) {
      whereConditions.idUser = idUser;
    }
    if (nombre) {
      whereConditions.nombre = nombre;
    }
    if (direccion) {
      whereConditions.direccion = direccion;
    }
    if (celular) {
      whereConditions.celular = celular;
    }
    if (email) {
      whereConditions.email = email;
    }
    if (rol) {
      whereConditions.rol = rol;
    }

    return await Usuarios.findAll({
      where: whereConditions,
      include: [Productos],
    });
  } catch (error) {
    return error.message;
  }
};

module.exports = {getUsuarios, getUsuariosFiltros};
