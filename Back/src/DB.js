const {Sequelize} = require('sequelize');
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const {relaciones} = require('./Relaciones/Relaciones.js');
const {DB_DEPLOY} = process.env;

const sequelize = new Sequelize(DB_DEPLOY, {
  logging: false,
  native: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Para evitar errores con certificados autofirmados
    },
  },
});

const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, '/Models'))
  .filter(
    (file) =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/Models', file)));
  });

modelDefiners.forEach((model) => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);
relaciones(sequelize.models);

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
