import {server} from '@/connections/connections';
import {cargarUsuarios} from '@/redux/Slices/slice';
import axios from 'axios';

const getUsuarios = async (dispatch) => {
  try {
    const {data} = await axios.get(`${server.baseUrl}usuarios`);
    dispatch(cargarUsuarios(data));
  } catch (error) {
    console.log(error);
  }
};

const getFiltroUsuarios = async (dataFiltro, dispatch) => {
  try {
    const {idUser, nombre, direccion, celular, email, rol} = dataFiltro;
    const params = {};

    if (idUser !== null && idUser !== undefined) params.idUser = idUser;
    if (nombre !== null && nombre !== undefined) params.nombre = nombre;
    if (direccion !== null && direccion !== undefined)
      params.direccion = direccion;
    if (celular !== null && celular !== undefined) params.celular = celular;
    if (email !== null && email !== undefined) params.email = email;
    if (rol !== null && rol !== undefined) params.rol = rol;

    const queryString = Object.keys(params)
      .map((key) => `${key}=${params[key]}`)
      .join('&');
    const {data} = await axios.get(`${server.baseUrl}usuarios?${queryString}`);

    dispatch(cargarUsuarios(data));
  } catch (error) {
    console.log(error.message);
  }
};

export {getUsuarios, getFiltroUsuarios};
