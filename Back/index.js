const {conn} = require('./src/DB');
const {superUser} = require('./src/Root/Root');
const server = require('./src/app');
const port = 4000;

conn.sync().then(() => {
  server.listen(port, () => {
    superUser();
    console.log(`Corriendo en el puerto: ${port}`);
  });
});
