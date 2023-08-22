const {
  getProductos,
  getProductosID,
  getProductosName,
} = require('../../Controller/ControllersProductos/getControllerProductos');

const getHandlerProductos = async (req, res) => {
  try {
    const {nombre} = req.query;
    if (nombre.length > 0) {
      const producto = await getProductosName(nombre);
      if (producto.length === 0) {
        return res.status(404).send('El producto no existe en la DB');
      }
      return res.status(200).json(producto);
    }
    const productos = await getProductos();
    return res.status(200).json(productos);
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
};

const getHandlerProductosID = async (req, res) => {
  const {id} = req.params;
  try {
    const producto = await getProductosID(id);
    return res.status(200).json(producto);
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
};

module.exports = {getHandlerProductos, getHandlerProductosID};
