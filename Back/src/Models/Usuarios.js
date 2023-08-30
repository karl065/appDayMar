const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'Usuarios',
    {
      idUser: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      direccion: {
        type: DataTypes.STRING,
      },
      celular: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rol: {
        type: DataTypes.ENUM('SuperUser', 'Admin', 'Cliente'),
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
