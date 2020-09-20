import axios from 'axios';

 {/*criar conexão no endereço padrão*/ }

const api = axios.create({
  baseURL: 'http://localhost:3333',
});

export default api;
