import {server} from '@/connections/connections';
import axios from 'axios';

const login = async (email, password) => {
  try {
    const {data} = await axios.post(`${server.baseUrl}auth`, {email, password});
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export default login;
