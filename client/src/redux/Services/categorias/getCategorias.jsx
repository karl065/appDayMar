import {server} from '@/connections/connections';
import {cargarCategorias} from '@/redux/Slices/slice';
import axios from 'axios';

const getCategorias = async (dispatch) => {
  try {
    const {data} = await axios.get(`${server.baseUrl}categorias`);
    dispatch(cargarCategorias(data));
  } catch (error) {
    console.log(error.message);
  }
};

export default getCategorias;
