/* Este código está definiendo un modelo Sequelize para una tabla llamada "Ventas" en una base de
datos. */
const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Ventas', {
    idVenta: {
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
  });
};
