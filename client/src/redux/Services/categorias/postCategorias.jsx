import {server} from '@/connections/connections';
import {nuevaCategoria} from '@/redux/Slices/slice';
import axios from 'axios';

const postCategorias = async (dataCategoria, dispatch) => {
  try {
    const {data} = await axios.post(
      `${server.baseUrl}categorias`,
      dataCategoria
    );
    dispatch(nuevaCategoria(data));
  } catch (error) {
    console.log(error.message);
  }
};

export default postCategorias;
