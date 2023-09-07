import {server} from '@/connections/connections';
import {actualizarProducto} from '@/redux/Slices/slice';
import axios from 'axios';

const putProductos = async (dataUpdate, idProduct, dispatch) => {
  try {
    const {data} = await axios.put(
      `${server.baseUrl}productos/${idProduct}`,
      dataUpdate
    );
    dispatch(actualizarProducto(data));
  } catch (error) {
    console.log(error.message);
  }
};

export default putProductos;
