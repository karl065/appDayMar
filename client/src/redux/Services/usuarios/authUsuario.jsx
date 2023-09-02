import {server} from '@/connections/connections';
import {userLogin} from '@/redux/Slices/slice';
import axios from 'axios';

const authUsuario = async (token, dispatch) => {
  try {
    const {data} = await axios.get(`${server.baseUrl}auth`, {
      headers: {
        'x-auth-token': token,
      },
    });
    dispatch(userLogin(data));
  } catch (error) {
    console.log(error);
  }
};

export default authUsuario;
