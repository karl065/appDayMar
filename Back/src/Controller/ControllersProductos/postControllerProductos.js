const {Productos, Usuarios, Categorias} = require('../../DB.js');

const postProductos = async (
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
) => {
  try {
    const producto = await Productos.create({
      nombre,
      descripcion,
      precioCompra,
      precioVenta,
      stock,
      imagen,
      tipo,
      status,
      idCategoria,
    });
    const usuario = await Usuarios.findByPk(usuarioID);
    await producto.addUsuario(usuario);
    const productoCreado = await Productos.findByPk(producto.idProducto, {
      include: [
        {
          model: Categorias,
          as: 'categorias',
        },
        {
          model: Usuarios,
        },
      ],
    });
    return productoCreado;
  } catch (error) {
    return error.message;
  }
};

module.exports = {postProductos};
