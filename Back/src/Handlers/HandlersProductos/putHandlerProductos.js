const {DATEONLY} = require('sequelize');
const {
  putProductos,
} = require('../../Controller/ControllersProductos/putControllerProductos');

const putHandlerProductos = async (req, res) => {
  const {id} = req.params;
  const {
    nombre,
    descripcion,
    precioCompra,
    precioVenta,
    stock,
    imagen,
    tipo,
    status,
    idCategoria,
  } = req.body;
  if (
    nombre ||
    descripcion ||
    precioCompra ||
    precioVenta ||
    stock ||
    imagen ||
    tipo ||
    status ||
    idCategoria
  ) {
    try {
      const fechaActualizado = new Date().toISOString().split('T')[0];

      const producto = await putProductos(
        {
          nombre,
          descripcion,
          precioCompra,
          precioVenta,
          stock,
          imagen,
          tipo,
          status,
          idCategoria,
          fechaActualizado,
        },
        id
      );
      return res.status(200).json(producto);
    } catch (error) {
      return res.status(500).json({error: error.message});
    }
  }
};

module.exports = {putHandlerProductos};
