import { defineStore } from 'pinia';
import getAPI from '@/lib/axios-api.js';

export const usePlanetsStore = defineStore({
    id: 'planets',
    state: () => ({
        fetchedPlanets: [],
        isFetchingPlanets: false
    }),
    getters: {
        planets: (state) => {
            return state.fetchedPlanets;
        }
    },
    actions: {
        async fetchPlanets() {
            // get planets from swapi
            try {
                // fetch only if empty
                if (!this.fetchedPlanets.length) {
                    const res = await getAPI('/planets/');
                    this.fetchedPlanets = [...res.data.results];
                }
            } catch (error) {
                console.error('fetching planets failed', error);
            } finally {
                this.isFetchingPlanets = false;
            }
        }
    }
});
