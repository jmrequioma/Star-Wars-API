import { defineStore } from 'pinia';
import getAPI from '@/lib/axios-api.js';

export const usePlanetsStore = defineStore({
    id: 'planets',
    actions: {
        fetchPlanets() {
            return getAPI('/planets/');
        }
    }
});
