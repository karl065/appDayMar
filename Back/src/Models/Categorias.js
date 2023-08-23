/* Este código define un modelo Sequelize para una tabla llamada "Categorías" en una base de datos. */
const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'Categorias',
    {
      idCategoria: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombreCategoria: {
        type: DataTypes.STRING,
      },
      descripcion: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      timestamps: false,
    }
  );
};
