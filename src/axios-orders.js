import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://burger-builder-app-713e2-default-rtdb.firebaseio.com/'
});

export default instance;