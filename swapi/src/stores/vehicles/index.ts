import { defineStore } from 'pinia';
import getAPI from '@/lib/axios-api.js';
import { constants } from '@/lib/constants/index.js';

export const useVehiclesStore = defineStore({
    id: 'vehicles',
    state: () => ({
        fetchedVehicles: [],
        isFetchingVehicles: false,
        vehiclesCount: 0,
        page: 1
    }),
    getters: {
        vehicles: (state) => {
            return state.fetchedVehicles;
        }
    },
    actions: {
        async fetchVehicles() {
            // get vehicles from swapi
            try {
                let apiUrl = '/vehicles/';
                if (this.page > 1) {
                    apiUrl += `?page=${this.page}`;
                }
                const res = await getAPI(apiUrl);
                this.vehiclesCount = res.data.count;
                this.fetchedVehicles.push(...res.data.results);
            } catch (error) {
                console.error('fetching vehicles failed', error);
            } finally {
                this.isFetchingVehicles = false;
            }
        },

        async fetchWookieeVehicles() {
            // get vehicles from swapi with wookiee
            try {
                let apiUrl = `${constants.baseUrl}vehicles/?format=wookiee`;
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
                        this.fetchedVehicles.push(...data.rcwochuanaoc);
                        this.vehiclesCount = data.oaoohuwhao;
                    });
            } catch (error) {
                console.error('fetching vehicles in wookiee failed', error);
            } finally {
                this.isFetchingVehicles = false;
            }
        }
    }
});
