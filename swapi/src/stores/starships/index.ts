import { defineStore } from 'pinia';
import getAPI from '@/lib/axios-api.js';
import { constants } from '@/lib/constants/index.js';

export const useStarshipsStore = defineStore({
    id: 'starships',
    state: () => ({
        fetchedStarships: [],
        isFetchingStarships: false,
        searchInput: '',
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
            // get starships from swapi
            try {
                let apiUrl = '/starships/';
                if (this.page > 1) {
                    apiUrl += `?page=${this.page}`;
                }
                if (this.searchInput) {
                    this.fetchedStarships = [];
                    apiUrl += `?search=${this.searchInput}`;
                }
                const res = await getAPI(apiUrl);
                this.starshipsCount = res.data.count;
                this.fetchedStarships.push(...res.data.results);
            } catch (error) {
                console.error('fetching starships failed', error);
            } finally {
                this.isFetchingStarships = false;
            }
        },

        async fetchWookieeStarships() {
            // get starships from swapi with wookiee
            try {
                let apiUrl = `${constants.baseUrl}starships/?format=wookiee`;
                if (this.page > 1) {
                    apiUrl += `&page=${this.page}`;
                }
                if (this.searchInput) {
                    this.fetchedStarships = [];
                    apiUrl += `&search=${this.searchInput}`;
                }
                fetch(apiUrl)
                    .then(response => {
                        return response.text().then((text) => {
                            text = text.replace(/whhuanan/g, '"whhuanan"');
                            return JSON.parse(text);
                        });
                    })
                    .then(data => {
                        this.fetchedStarships.push(...data.rcwochuanaoc);
                        this.starshipsCount = data.oaoohuwhao;
                    });
            } catch (error) {
                console.error('fetching starships in wookiee failed', error);
            } finally {
                this.isFetchingStarships = false;
            }
        }
    }
});
