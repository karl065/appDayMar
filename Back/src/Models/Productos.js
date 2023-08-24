const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'Productos',
    {
      idProducto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      precioCompra: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      precioVenta: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      imagen: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tipo: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.ENUM('D', 'N'), // D = Disponible, N = No disponible.
      },
      fechaCreado: {
        type: DataTypes.DATEONLY,
        defaultValue: sequelize.fn('NOW'),
      },
      fechaActualizado: {
        type: DataTypes.DATEONLY,
        defaultValue: sequelize.fn('NOW'),
      },
    },
    {
      timestamps: false,
    }
  );
};
