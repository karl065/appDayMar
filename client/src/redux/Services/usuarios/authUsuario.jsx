import {server} from '@/connections/connections';
import {userLogin} from '@/redux/Slices/slice';
import axios from 'axios';

const authUsuario = async (token, dispatch) => {
  if (token) {
    try {
      const {data} = await axios.get(`${server.baseUrl}auth`, {
        headers: {
          'x-auth-token': token,
        },
      });
      data.token = token;
      dispatch(userLogin(data));
    } catch (error) {
      const {data} = error.response;
      if (data.error === 'Sesion vencida') localStorage.removeItem('token');
    }
  }
};

export default authUsuario;
