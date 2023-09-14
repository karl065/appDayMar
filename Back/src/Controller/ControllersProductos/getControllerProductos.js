const {Op} = require('sequelize');
const {Productos, Usuarios, Categorias} = require('../../DB.js');

const getProductos = async () => {
  try {
    return await Productos.findAll({
      include: [
        {
          model: Categorias,
          as: 'categorias',
        },
        {
          model: Usuarios,
        },
      ],
    });
  } catch (error) {
    return error;
  }
};

const getProductosFiltros = async (
  idProducto,
  nombre,
  minPrecioV = 0,
  maxPrecioV,
  minPrecioC = 0,
  maxPrecioC,
  minCant = 0,
  maxCant,
  tipo,
  status,
  fechaCreado,
  fechaActualizado,
  idCategoria
) => {
  try {
    let maxValue;
    if (!maxPrecioV || !maxPrecioC || !maxCant) {
      maxValue = 9223372036854775807n;
    }
    const whereConditions = {
      precioVenta: {
        [Op.between]: [minPrecioV, maxPrecioV ? maxPrecioV : maxValue],
      },
      precioCompra: {
        [Op.between]: [minPrecioC, maxPrecioC ? maxPrecioC : maxValue],
      },
      stock: {[Op.between]: [minCant, maxCant ? maxCant : maxValue]},
    };

    if (idProducto) {
      whereConditions.idProducto = idProducto;
    }
    if (nombre) {
      whereConditions.nombre = {[Op.iLike]: `%${nombre}%`};
    }
    if (tipo) {
      whereConditions.tipo = tipo;
    }
    if (status) {
      whereConditions.status = status;
    }
    if (fechaCreado) {
      whereConditions.fechaCreado = fechaCreado;
    }
    if (fechaActualizado) {
      whereConditions.fechaActualizado = fechaActualizado;
    }
    if (idCategoria) {
      whereConditions.idCategoria = idCategoria;
    }

    return await Productos.findAll({
      where: whereConditions,
      include: [
        {
          model: Categorias,
          as: 'categorias',
        },
        {
          model: Usuarios,
        },
      ],
    });
  } catch (error) {
    return error.message;
  }
};

module.exports = {
  getProductos,
  getProductosFiltros,
};
