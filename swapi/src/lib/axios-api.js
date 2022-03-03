import axios from 'axios';

const getAPI = axios.create({
    baseURL: 'https://swapi.dev/api/',
    timeout: 3000,
});

export default getAPI;
