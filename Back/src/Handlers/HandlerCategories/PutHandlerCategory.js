const {
  putControllerCategory,
} = require('../../Controller/ControllersCategorias/PutControllerCategory');

const putHandlerCategory = async (req, res) => {
  const {id} = req.params;
  const {nombreCategoria, descripcion, status} = req.body;

  try {
    const categoryData = {
      ...(nombreCategoria !== undefined && {nombreCategoria}),
      ...(descripcion !== undefined && {descripcion}),
      ...(status !== undefined && {status}),
    };
    const categoryUpdate = await putControllerCategory(categoryData, id);
    return res.status(200).json(categoryUpdate);
  } catch (error) {
    return res.status(500).json({error: error});
  }
};

module.exports = {putHandlerCategory};
