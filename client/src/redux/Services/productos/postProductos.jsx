import {server} from '@/connections/connections';
import {nuevoProducto} from '@/redux/Slices/slice';
import axios from 'axios';

const postProductos = async (dataProducto, dispatch) => {
  try {
    const {data} = await axios.post(`${server.baseUrl}productos`, dataProducto);
    dispatch(nuevoProducto(data));
  } catch (error) {
    console.log(error.message);
  }
};

export default postProductos;
