import { defineStore } from 'pinia';
import getAPI from '@/lib/axios-api.js';

export const usePlanetsStore = defineStore({
    id: 'planets',
    state: () => ({
        fetchedPlanets: [],
        isFetchingPlanets: false,
        planetsCount: 0,
        page: 1
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
                let apiUrl = '/planets/';
                if (this.page > 1) {
                    apiUrl += `?page=${this.page}`;
                }
                const res = await getAPI(apiUrl);
                this.planetsCount = res.data.count;
                this.fetchedPlanets.push(...res.data.results);
            } catch (error) {
                console.error('fetching planets failed', error);
            } finally {
                this.isFetchingPlanets = false;
            }
        }
    }
});
