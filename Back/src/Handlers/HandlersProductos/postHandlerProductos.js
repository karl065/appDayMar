const {
  postProductos,
} = require('../../Controller/ControllersProductos/postControllerProductos');

const postHandlerProductos = async (req, res) => {
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
    usuarioID,
  } = req.body;
  if (
    !nombre ||
    !descripcion ||
    !precioCompra ||
    !precioVenta ||
    !stock ||
    !imagen ||
    !tipo ||
    !status ||
    !idCategoria
  ) {
    return res.status(401).send('No deben haber campos vacíos');
  }
  try {
    const producto = await postProductos(
      nombre,
      descripcion,
      precioCompra,
      precioVenta,
      stock,
      imagen,
      tipo,
      status,
      idCategoria,
      usuarioID
    );
    return res.status(200).json(producto);
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
};

module.exports = {postHandlerProductos};
