import { defineStore } from 'pinia';
import getAPI from '@/lib/axios-api.js';
import { constants } from '@/lib/constants/index.js';

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
        },

        async fetchWookieeSpecies() {
            // get species from swapi with wookiee
            try {
                let apiUrl = `${constants.baseUrl}species/?format=wookiee`;
                if (this.page > 1) {
                    apiUrl += `&page=${this.page}`;
                }
                fetch(apiUrl)
                    .then(response => {
                        return response.text().then((text) => {
                            text = text.replace(/whhuanan/g, '"whhuanan"');
                            return JSON.parse(text);
                        });
                    })
                    .then(data => {
                        this.fetchedSpecies.push(...data.rcwochuanaoc);
                        this.speciesCount = data.oaoohuwhao;
                    });
            } catch (error) {
                console.error('fetching species in wookiee failed', error);
            } finally {
                this.isFetchingSpecies = false;
            }
        }
    }
});
