import { defineStore } from 'pinia';
import getAPI from '@/lib/axios-api.js';

export const useSpeciesStore = defineStore({
    id: 'species',
    state: () => ({
        fetchedSpecies: [],
        isFetchingSpecies: false,
        speciesCount: 0,
        page: 1
    }),
    getters: {
        species: (state) => {
            return state.fetchedSpecies;
        }
    },
    actions: {
        async fetchSpecies() {
            // get species from swapi
            try {
                let apiUrl = '/species/';
                if (this.page > 1) {
                    apiUrl += `?page=${this.page}`;
                }
                const res = await getAPI(apiUrl);
                this.speciesCount = res.data.count;
                this.fetchedSpecies.push(...res.data.results);
            } catch (error) {
                console.error('fetching species failed', error);
            } finally {
                this.isFetchingSpecies = false;
            }
        }
    }
});
