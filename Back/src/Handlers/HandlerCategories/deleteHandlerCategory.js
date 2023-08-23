const {
  deleteControllerCategory,
} = require('../../Controller/ControllersCategorias/DeleteControllerCategory');

const deleteHandlerCategory = async (req, res) => {
  const {id} = req.params;
  try {
    const category = await deleteControllerCategory(id);
    return res.status(200).json(category);
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
};

module.exports = {deleteHandlerCategory};
