import { defineStore } from "pinia";
import axios from 'axios';

export const useEntityStore = defineStore({
    id: 'entities',
    state: () => ({
        entity: null,
        isFetchingDetails: true
    }),
    getters: {
        selectedEntity: (state) => {
            return state.entity;
        }
    },
    actions: {
        async fetchEntityDetails(url : string) {
            /*
                fetches the details of a specific
                entity
            */
            try {
                const res = await axios.get(url);
                this.entity = res.data;
            } catch (error) {
                console.error('fetching entity details failed');
            }
        },

        async fetchWookieeEntityDetails(url : string) {
            /*
                fetches the details of a specific
                entity in wookiee
            */
            try {
                fetch(url)
                    .then(response => {
                        return response.text().then((text) => {
                            // there is a need to replace these since
                            // server is giving an invalid json object response
                            return this.replaceInvalidText(text);
                        });
                    })
                    .then(data => {
                        this.entity = data;
                    });
            } catch (error) {
                console.error('fetching wookiee entity details failed', error);
            }
        },

        fetchRelatedEntityDetails(url : string) {
            /*
                fetches the related details of an entity
                (residents, films, starships, etc.)
            */
            return axios.get(url);
        },

        fetchRelatedWookieEntities(url : string) {
            try {
                return fetch(url)
                    .then(response => {
                        return response.text().then((text) => {
                            // there is a need to replace these since
                            // they are giving an invalid json object response
                            return this.replaceInvalidText(text);
                        });
                    })
                    .then(data => {
                        return data;
                    });
            } catch (error) {
                console.error('fetching related wookiee entities failed', error);
            }
        },

        replaceInvalidText(text : string) {
            /**
             * replaces the invalid text
             * found on wookie response
             */
            text = text.replace(/whhuanan/g, '"whhuanan"');
            text = text.replace(/\\rc\\wh/g, '\\r\\n');
            return JSON.parse(text);
        }
    }
});
