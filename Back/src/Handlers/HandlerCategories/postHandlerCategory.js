const {
  crearCategoria,
} = require('../../Controller/ControllersCategorias/PostControllerCategory');

const postHandlerCategory = async (req, res) => {
  const {nombreCategoria, descripcion, status} = req.body;

  try {
    const category = await crearCategoria(nombreCategoria, descripcion, status);
    return res.status(200).json(category);
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
};

module.exports = {postHandlerCategory};
