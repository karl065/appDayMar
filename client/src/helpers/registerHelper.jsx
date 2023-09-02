import {server} from '@/connections/connections';
import axios from 'axios';

const register = async (nombre, direccion, celular, email, password, rol) => {
  try {
    const {data} = await axios.post(`${server.baseUrl}usuarios`, {
      nombre,
      direccion,
      celular,
      email,
      password,
      rol,
    });
    console.log(data);
  } catch (error) {
    console.log(error.message);
  }
};

export default register;
