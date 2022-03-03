import { defineStore } from 'pinia';
import getAPI from '@/lib/axios-api.js';
import axios from 'axios';

export const usePlanetsStore = defineStore({
    id: 'planets',
    actions: {
        fetchPlanets() {
            return getAPI('/planets/');
        },

        fetchPlanetDetails(url : string) {
            return axios.get(url);
        }
    }
});
