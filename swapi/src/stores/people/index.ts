import { defineStore } from 'pinia';
import getAPI from '@/lib/axios-api.js';

export const usePeopleStore = defineStore({
    id: 'people',
    state: () => ({
        fetchedPeople: [],
        isFetchingPeople: false,
        peopleCount: 0,
        page: 1
    }),
    getters: {
        people: (state) => {
            return state.fetchedPeople;
        }
    },
    actions: {
        async fetchPeople() {
            // get people from swapi
            try {
                let apiUrl = '/people/';
                if (this.page > 1) {
                    apiUrl += `?page=${this.page}`;
                }
                const res = await getAPI(apiUrl);
                this.peopleCount = res.data.count;
                this.fetchedPeople.push(...res.data.results);
            } catch (error) {
                console.error('fetching people failed', error);
            } finally {
                this.isFetchingPeople = false;
            }
        }
    }
});
