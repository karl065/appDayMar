const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'Pedidos',
    {
      idPedido: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      cantProd: {
        type: DataTypes.INTEGER,
      },
      total: {
        type: DataTypes.INTEGER,
      },
    },
    {
      timestamps: false,
    }
  );
};
