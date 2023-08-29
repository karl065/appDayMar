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

export {getProductos};
