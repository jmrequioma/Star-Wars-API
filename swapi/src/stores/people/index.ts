import { defineStore } from 'pinia';
import getAPI from '@/lib/axios-api.js';
import { constants } from '@/lib/constants/index.js';

export const usePeopleStore = defineStore({
    id: 'people',
    state: () => ({
        fetchedPeople: [],
        isFetchingPeople: false,
        searchInput: '',
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
                if (this.searchInput) {
                    this.fetchedPeople = [];
                    apiUrl += `?search=${this.searchInput}`;
                }
                const res = await getAPI(apiUrl);
                this.peopleCount = res.data.count;
                this.fetchedPeople.push(...res.data.results);
            } catch (error) {
                console.error('fetching people failed', error);
            } finally {
                this.isFetchingPeople = false;
            }
        },

        async fetchWookieePeople() {
            // get people from swapi with wookiee
            try {
                let apiUrl = `${constants.baseUrl}people/?format=wookiee`;
                if (this.page > 1) {
                    apiUrl += `&page=${this.page}`;
                }
                if (this.searchInput) {
                    this.fetchedPeople = [];
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
                        this.fetchedPeople.push(...data.rcwochuanaoc);
                        this.peopleCount = data.oaoohuwhao;
                    });
            } catch (error) {
                console.error('fetching people in wookiee failed', error);
            } finally {
                this.isFetchingPeople = false;
            }
        }
    }
});
