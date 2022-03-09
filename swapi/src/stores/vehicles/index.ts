import { defineStore } from 'pinia';
import getAPI from '@/lib/axios-api.js';

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
        }
    }
});
