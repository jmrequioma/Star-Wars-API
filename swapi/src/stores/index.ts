import { defineStore } from "pinia";
import axios from 'axios';

export const useEntityStore = defineStore({
    id: 'entities',
    state: () => ({
        entity: null,
        isFetchingDetails: false
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

        fetchRelatedEntityDetails(url : string) {
            return axios.get(url);
        }
    }
});