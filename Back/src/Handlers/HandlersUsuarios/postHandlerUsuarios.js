const {
  postUsuarios,
} = require('../../Controller/ControllersUsuarios/postControllerUsuarios');

const postHandlerUsuarios = async (req, res) => {
  const {nombre, direccion, celular, email, password, rol} = req.body;

  if (!nombre || !email || !password || !rol) {
    return res.status(401).send('Debe llenar todos los campos');
  }
  try {
    const usuario = await postUsuarios(
      nombre,
      direccion,
      celular,
      email,
      password,
      rol
    );
    return res.status(200).json(usuario);
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {postHandlerUsuarios};
