import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://react-my-burger-232af.firebaseio.com/'
})

export default axiosInstance;

