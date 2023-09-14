import {server} from '@/connections/connections';
import {actualizarUsuarios} from '@/redux/Slices/slice';

import axios from 'axios';

const putUsuarios = async (dataUpdate, idUser, dispatch) => {
  try {
    const {data} = await axios.put(
      `${server.baseUrl}usuarios/${idUser}`,
      dataUpdate
    );
    dispatch(actualizarUsuarios(data));
  } catch (error) {
    console.log(error.message);
  }
};

export default putUsuarios;
