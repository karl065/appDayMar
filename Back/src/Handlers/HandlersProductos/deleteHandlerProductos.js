const {
  deleteProducto,
} = require('../../Controller/ControllersProductos/deleteControllerProductos');

const deleteHandlerProducto = async (req, res) => {
  const {id} = req.params;
  try {
    const producto = await deleteProducto(id);
    return res.status(200).json(producto);
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
};

module.exports = {deleteHandlerProducto};
