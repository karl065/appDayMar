import {server} from '@/connections/connections';
import {cargarProductos} from '@/redux/Slices/slice';
import axios from 'axios';

const getProductos = async (dispatch) => {
  try {
    const {data} = await axios.get(`${server.baseUrl}productos`);
    dispatch(cargarProductos(data));
  } catch (error) {
    console.log(error);
  }
};

const getFiltroProductos = async (dataFiltro, dispatch) => {
  try {
    const {
      idProducto,
      nombre,
      minPrecioV,
      maxPrecioV,
      minPrecioC,
      maxPrecioC,
      minCant,
      maxCant,
      tipo,
      status,
      fechaCreado,
      fechaActualizado,
      idCategoria,
    } = dataFiltro;
    const params = {};

    if (idProducto !== null && idProducto !== undefined)
      params.idProducto = idProducto;
    if (nombre !== null && nombre !== undefined) params.nombre = nombre;
    if (minPrecioV !== null && minPrecioV !== undefined)
      params.minPrecioV = minPrecioV;
    if (maxPrecioV !== null && maxPrecioV !== undefined)
      params.maxPrecioV = maxPrecioV;
    if (minPrecioC !== null && minPrecioC !== undefined)
      params.minPrecioC = minPrecioC;
    if (maxPrecioC !== null && maxPrecioC !== undefined)
      params.maxPrecioC = maxPrecioC;
    if (minCant !== null && minCant !== undefined) params.minCant = minCant;
    if (maxCant !== null && maxCant !== undefined) params.maxCant = maxCant;
    if (tipo !== null && tipo !== undefined) params.tipo = tipo;
    if (status !== null && status !== undefined) params.status = status;
    if (fechaCreado !== null && fechaCreado !== undefined)
      params.fechaCreado = fechaCreado;
    if (fechaActualizado !== null && fechaActualizado !== undefined)
      params.fechaActualizado = fechaActualizado;
    if (idCategoria !== null && idCategoria !== undefined)
      params.idCategoria = idCategoria;

    const queryString = Object.keys(params)
      .map((key) => `${key}=${params[key]}`)
      .join('&');
    const {data} = await axios.get(`${server.baseUrl}productos?${queryString}`);
    console.log(data);
    dispatch(cargarProductos(data));
  } catch (error) {}
};

export {getProductos, getFiltroProductos};
