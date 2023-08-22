const {Router} = require('express');
const usuarios = require('./RoutesUsuario/RoutesUsuario.js');
const productos = require('./RoutesProductos/RoutesProductos.js');
const router = Router();

router.use('/usuarios', usuarios);
router.use('/productos', productos);

module.exports = router;
