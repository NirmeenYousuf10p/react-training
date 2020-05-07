import axios from 'axios';
const instance = axios.create({
  baseURL: 'https://react-burger-builder-87d03.firebaseio.com/',
});

export default instance;
