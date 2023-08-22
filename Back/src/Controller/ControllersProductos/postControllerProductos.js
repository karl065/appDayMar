const {Productos, Usuarios} = require('../../DB.js');

const postProductos = async (
  nombre,
  descripcion,
  precio,
  stock,
  imagen,
  usuarioID
) => {
  try {
    const producto = await Productos.create({
      nombre,
      descripcion,
      precio,
      stock,
      imagen,
    });
    const usuario = await Usuarios.findByPk(usuarioID);
    await producto.addUsuario(usuario);
    const productoCreado = await Productos.findByPk(producto.id, {
      include: [Usuarios],
    });
    return productoCreado;
  } catch (error) {
    return error.message;
  }
};

module.exports = {postProductos};
