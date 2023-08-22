const {
  putUsuarios,
} = require('../../Controller/ControllersUsuarios/putControllerUsuarios');

const putHandlerUsuarios = async (req, res) => {
  const {id} = req.params;
  const {nombre, direccion, celular, email, password, rol} = req.body;
  if (nombre || direccion || celular || email || password || rol) {
    try {
      const usuario = await putUsuarios(
        {nombre, direccion, celular, email, password, rol},
        id
      );
      return res.status(200).json(usuario);
    } catch (error) {
      return res.status(500).json({error: error.message});
    }
  }
};

module.exports = {putHandlerUsuarios};
