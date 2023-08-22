const {
  getUsuarios,
  getUsuarioId,
} = require('../../Controller/ControllersUsuarios/getControllerUsuarios');

const getHandleUsuarios = async (req, res) => {
  try {
    const usuarios = await getUsuarios();
    return res.status(200).json(usuarios);
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
};

const getHandleUsuariosID = async (req, res) => {
  const {id} = req.params;
  try {
    const usuario = await getUsuarioId(id);
    return res.status(200).json(usuario);
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
};

module.exports = {getHandleUsuarios, getHandleUsuariosID};
