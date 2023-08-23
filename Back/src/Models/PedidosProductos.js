const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'PedidosProductos',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      cant: {
        type: DataTypes.INTEGER,
      },
      precioPorUnd: {
        type: DataTypes.INTEGER,
      },
      precioPorCant: {
        type: DataTypes.INTEGER,
      },
    },
    {
      timestamps: false,
    }
  );
};
