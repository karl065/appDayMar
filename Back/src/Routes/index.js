const {Router} = require('express');
const usuarios = require('./RoutesUsuario/RoutesUsuario.js');
const productos = require('./RoutesProductos/RoutesProductos.js');
const categorias = require('./CategoriesRoutes/CategoriesRoutes.js');
const pedidos = require('./RoutesPedidos/RoutesPedidos.js');
const router = Router();

router.use('/usuarios', usuarios);
router.use('/productos', productos);
router.use('/categorias', categorias);
router.use('/pedidos', pedidos);

module.exports = router;
