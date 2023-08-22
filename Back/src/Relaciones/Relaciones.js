const relaciones = (models) => {
  const {Usuarios, Productos} = models;
  Usuarios.belongsToMany(Productos, {
    through: 'UsuariosProductos',
    timestamps: false,
  });
  Productos.belongsToMany(Usuarios, {
    through: 'UsuariosProductos',
    timestamps: false,
  });

  return {
    Usuarios,
    Productos,
  };
};

module.exports = {relaciones};
