const {
  putProductos,
} = require('../../Controller/ControllersProductos/putControllerProductos');

const putHandlerProductos = async (req, res) => {
  const {id} = req.params;
  const {nombre, descripcion, precio, stock, imagen} = req.body;
  if (nombre || descripcion || precio || stock || imagen) {
    try {
      const producto = await putProductos(
        {nombre, descripcion, precio, stock, imagen},
        id
      );
      return res.status(200).json(producto);
    } catch (error) {
      return res.status(500).json({error: error.message});
    }
  }
};

module.exports = {putHandlerProductos};
