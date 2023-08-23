const {
  getCategoryByName,
  getCategoryByStatus,
  getCategoryID,
  getAllCategory,
} = require('../../Controller/ControllersCategorias/GetControllerCategory');

const getHandlerCategory = async (req, res) => {
  const {id} = req.params;
  const {nombreCategoria, status} = req.query;
  try {
    if (nombreCategoria) {
      const category = await getCategoryByName(nombreCategoria);
      return res.status(200).json(category);
    }
    if (status) {
      const categoryStatus = await getCategoryByStatus(status);
      return res.status(200).json(categoryStatus);
    }
    if (id) {
      const categoryByID = await getCategoryID(id);
      return res.status(200).json(categoryByID);
    }
    const allCategory = await getAllCategory();
    return res.status(200).json(allCategory);
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
};

module.exports = {getHandlerCategory};
