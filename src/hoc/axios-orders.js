import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burgershpear-default-rtdb.firebaseio.com/'
});

export default instance;