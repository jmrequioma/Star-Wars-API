import { defineStore } from 'pinia';
import getAPI from '@/lib/axios-api.js';
import { constants } from '@/lib/constants/index.js';

export const useFilmsStore = defineStore({
    id: 'films',
    state: () => ({
        fetchedFilms: [],
        isFetchingFilms: false,
        searchInput: '',
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
                if (this.searchInput) {
                    this.fetchedFilms = [];
                    apiUrl += `?search=${this.searchInput}`;
                }
                const res = await getAPI(apiUrl);
                this.filmsCount = res.data.count;
                this.fetchedFilms.push(...res.data.results);
            } catch (error) {
                console.error('fetching films failed', error);
            } finally {
                this.isFetchingFilms = false;
            }
        },

        async fetchWookieeFilms() {
            // get films from swapi with wookiee
            try {
                let apiUrl = `${constants.baseUrl}films/?format=wookiee`;
                if (this.page > 1) {
                    apiUrl += `&page=${this.page}`;
                }
                if (this.searchInput) {
                    this.fetchedFilms = [];
                    apiUrl += `&search=${this.searchInput}`;
                }
                fetch(apiUrl)
                    .then(response => {
                        return response.text().then((text) => {
                            text = text.replace(/whhuanan/g, '"whhuanan"');
                            text = text.replace(/\\rc\\wh/g, '\\r\\n');
                            return JSON.parse(text);
                        });
                    })
                    .then(data => {
                        this.fetchedFilms.push(...data.rcwochuanaoc);
                        this.filmsCount = data.oaoohuwhao;
                    });
            } catch (error) {
                console.error('fetching films in wookiee failed', error);
            } finally {
                this.isFetchingFilms = false;
            }
        },

        setToInitialState() {
            /**
             * resets the variables
             * to the original state
             */

            this.isFetchingFilms = true;
            this.page = 1;
            this.fetchedFilms = [];
        }
    }
});
