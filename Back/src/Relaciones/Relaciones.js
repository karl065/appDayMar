// Archivo: relaciones.js

/**
 * La función `relaciones` establece relaciones entre diferentes modelos en una aplicación JavaScript.
 * @param models - El parámetro `models` es un objeto que contiene referencias a los diferentes modelos
 * en su aplicación. Cada modelo representa una tabla en su base de datos.
 * @returns The function `relaciones` returns an object that contains references to the models
 * `Personas`, `Usuarios`, `Inventarios`, `Categorias`, `Ventas`, `Favoritos`, and `Pagos`.
 */
const relaciones = (models) => {
  const {
    Usuarios,
    Productos,
    Pedidos,
    Categorias,
    PedidosProductos,
    VentasProductos,
    Ventas,
  } = models;

  Usuarios.belongsToMany(Productos, {
    through: 'UsuariosProductos',
    timestamps: false,
  });
  Productos.belongsToMany(Usuarios, {
    through: 'UsuariosProductos',
    timestamps: false,
  });

  Categorias.hasMany(Productos, {
    foreignKey: 'idCategoria',
    as: 'productos',
  });
  Productos.belongsTo(Categorias, {
    foreignKey: 'idCategoria',
    as: 'categorias',
  });

  Usuarios.hasMany(Ventas, {
    foreignKey: 'idUser',
    as: 'ventas',
  });
  Ventas.belongsTo(Usuarios, {
    foreignKey: 'idUser',
    as: 'usuario',
  });

  Ventas.belongsToMany(Productos, {
    through: {
      model: VentasProductos,
      unique: false,
      attributes: ['cant', 'precioPorUnd', 'precioPorCant'],
    },
    foreignKey: 'idVenta',
  });
  Productos.belongsToMany(Ventas, {
    through: {
      model: VentasProductos,
      unique: false,
      attributes: ['cant', 'precioPorUnd', 'precioPorCant'],
    },
    foreignKey: 'idProducto',
  });

  Usuarios.hasOne(Pedidos, {foreignKey: 'idUser', as: 'pedido'});
  Pedidos.belongsTo(Usuarios, {foreignKey: 'idUser', as: 'usuario'});

  // Hook afterCreate para crear automáticamente un carrito con valores nulos para el usuario recién creado
  Usuarios.afterCreate(async (usuario, options) => {
    try {
      await Pedidos.create({
        cantProd: 0,
        total: 0,
        idUser: usuario.idUser,
      });
    } catch (error) {
      console.error('Error al crear el carrito:', error);
    }
  });

  Pedidos.belongsToMany(Productos, {
    through: {
      model: PedidosProductos,
      unique: false,
      attributes: ['cant', 'precioPorUnd', 'precioPorCant'],
    },
    foreignKey: 'idPedido',
  });

  Productos.belongsToMany(Pedidos, {
    through: {
      model: PedidosProductos,
      unique: false,
      attributes: ['cant', 'precioPorUnd', 'precioPorCant'],
    },
    foreignKey: 'idProducto',
  });

  return {
    Usuarios,
    Productos,
    Pedidos,
    Categorias,
    PedidosProductos,
    VentasProductos,
    Ventas,
  };
};
module.exports = {relaciones};
