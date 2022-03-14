import axios from 'axios';
import { constants } from './constants';

const getAPI = axios.create({
    baseURL: constants.baseUrl,
    timeout: 5000,
});

export default getAPI;
