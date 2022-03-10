import { defineStore } from 'pinia';
import getAPI from '@/lib/axios-api.js';
import { constants } from '@/lib/constants/index.js';

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
        },

        async fetchWookieePlanets() {
            // get planets from swapi with wookiee
            try {
                let apiUrl = `${constants.baseUrl}planets/?format=wookiee`;
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
                        this.fetchedPlanets.push(...data.rcwochuanaoc);
                        this.planetsCount = data.oaoohuwhao;
                    });
            } catch (error) {
                console.error('fetching planets in wookiee failed', error);
            } finally {
                this.isFetchingPlanets = false;
            }
        }
    }
});
