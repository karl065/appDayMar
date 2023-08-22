const {
  postProductos,
} = require('../../Controller/ControllersProductos/postControllerProductos');

const postHandlerProductos = async (req, res) => {
  const {nombre, descripcion, precio, stock, imagen, usuarioID} = req.body;
  if (!nombre || !descripcion || !precio || !stock || !imagen) {
    return res.status(401).send('No deben haber campos vacios');
  }
  try {
    const producto = await postProductos(
      nombre,
      descripcion,
      precio,
      stock,
      imagen,
      usuarioID
    );
    return res.status(200).json(producto);
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
};

module.exports = {postHandlerProductos};
