import { defineStore } from 'pinia';
import getAPI from '@/lib/axios-api.js';

export const useFilmsStore = defineStore({
    id: 'films',
    state: () => ({
        fetchedFilms: [],
        isFetchingFilms: false,
        filmsCount: 0,
        page: 1
    }),
    getters: {
        films: (state) => {
            return state.fetchedFilms;
        }
    },
    actions: {
        async fetchFilms() {
            // get films from swapi
            try {
                let apiUrl = '/films/';
                if (this.page > 1) {
                    apiUrl += `?page=${this.page}`;
                }
                const res = await getAPI(apiUrl);
                this.filmsCount = res.data.count;
                this.fetchedFilms.push(...res.data.results);
            } catch (error) {
                console.error('fetching films failed', error);
            } finally {
                this.isFetchingFilms = false;
            }
        }
    }
});
