const {conn} = require('./src/DB');
const server = require('./src/app');
const port = 3000;

conn.sync({force: true}).then(() => {
  server.listen(port, () => {
    console.log(`Corriendo en el puerto: ${port}`);
  });
});
