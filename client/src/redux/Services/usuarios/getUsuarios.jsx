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

export {getUsuarios};
