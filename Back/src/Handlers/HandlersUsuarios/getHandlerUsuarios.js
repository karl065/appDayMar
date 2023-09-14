const {
  getUsuarios,
  getUsuariosFiltros,
} = require('../../Controller/ControllersUsuarios/getControllerUsuarios');

const getHandleUsuarios = async (req, res) => {
  try {
    const {idUser, nombre, direccion, celular, email, rol} = req.query;

    if (idUser || nombre || direccion || celular || email || rol) {
      const usuarios = await getUsuariosFiltros(
        idUser,
        nombre,
        direccion,
        celular,
        email,
        rol
      );
      return res.status(200).json(usuarios);
    }

    const usuarios = await getUsuarios();
    return res.status(200).json(usuarios);
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
};

module.exports = {getHandleUsuarios};
