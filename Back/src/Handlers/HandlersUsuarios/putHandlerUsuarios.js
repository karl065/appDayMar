const {
  putUsuarios,
} = require('../../Controller/ControllersUsuarios/putControllerUsuarios');
const bcryptjs = require('bcryptjs');

const putHandlerUsuarios = async (req, res) => {
  const {id} = req.params;
  const {nombre, direccion, celular, email, password, rol} = req.body;
  if (nombre || direccion || celular || email || password || rol) {
    try {
      let passwordHash;
      if (password) {
        passwordHash = await bcryptjs.hash(password, 10);
      }
      const usuario = await putUsuarios(
        {nombre, direccion, celular, email, password: passwordHash, rol},
        id
      );
      return res.status(200).json(usuario);
    } catch (error) {
      return res.status(500).json({error: error.message});
    }
  }
};

module.exports = {putHandlerUsuarios};
