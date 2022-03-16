import { defineStore } from "pinia";

export const useAppStore = defineStore({
    id: 'app',
    state: () => ({
        isWookieeEncoding: false
    }),
    getters: {

    },
    actions: {
        toggleWookieeSwitch(isWookieeEncoding : boolean) {
            this.isWookieeEncoding = isWookieeEncoding;
        }
    }
});
