const {
  getProductos,
  getProductosFiltros,
} = require('../../Controller/ControllersProductos/getControllerProductos');

const getHandlerProductos = async (req, res) => {
  try {
    const {
      idProducto,
      nombre,
      minPrecioV,
      maxPrecioV,
      minPrecioC,
      maxPrecioC,
      minCant,
      maxCant,
      tipo,
      status,
      fechaCreado,
      fechaActualizado,
      idCategoria,
    } = req.query;

    if (
      idProducto ||
      nombre ||
      minPrecioV ||
      maxPrecioV ||
      minPrecioC ||
      maxPrecioC ||
      minCant ||
      maxCant ||
      tipo ||
      status ||
      fechaCreado ||
      fechaActualizado ||
      idCategoria
    ) {
      const productos = await getProductosFiltros(
        idProducto,
        nombre,
        minPrecioV,
        maxPrecioV,
        minPrecioC,
        maxPrecioC,
        minCant,
        maxCant,
        tipo,
        status,
        fechaCreado,
        fechaActualizado,
        idCategoria
      );
      return res.status(200).json(productos);
    }
    const productos = await getProductos();
    return res.status(200).json(productos);
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
};

module.exports = {getHandlerProductos};
