import { defineStore } from 'pinia';
import getAPI from '@/lib/axios-api.js';

export const useStarshipsStore = defineStore({
    id: 'starships',
    state: () => ({
        fetchedStarships: [],
        isFetchingStarships: false,
        starshipsCount: 0,
        page: 1
    }),
    getters: {
        starships: (state) => {
            return state.fetchedStarships;
        }
    },
    actions: {
        async fetchStarships() {
            // get people from swapi
            try {
                let apiUrl = '/starships/';
                if (this.page > 1) {
                    apiUrl += `?page=${this.page}`;
                }
                const res = await getAPI(apiUrl);
                this.starshipsCount = res.data.count;
                this.fetchedStarships.push(...res.data.results);
            } catch (error) {
                console.error('fetching starships failed', error);
            } finally {
                this.isFetchingStarships = false;
            }
        }
    }
});
