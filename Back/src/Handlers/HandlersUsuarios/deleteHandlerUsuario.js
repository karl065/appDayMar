const {
  deleteUsuario,
} = require('../../Controller/ControllersUsuarios/deleteControllerUsuarios');

const deleteHandlerUsuario = async (req, res) => {
  const {id} = req.params;
  try {
    const usuario = await deleteUsuario(id);
    return res.status(200).json(usuario);
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
};

module.exports = {deleteHandlerUsuario};
