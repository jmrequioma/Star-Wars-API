import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import { useAppStore } from '@/stores/app/index';
import { useStarshipsStore } from '@/stores/starships';
import { createRouter, createWebHistory, type Router } from 'vue-router';
import { starshipData } from '@/tests/starships/data';

import StarshipsView from '../StarshipsView.vue';

import { routes } from '@/router';

describe('StarshipsView', () => {
    let wrapper : VueWrapper;
    let router : Router;
    let appStore;
    let store;

    const starships = starshipData.starships;

    const wookieeStarships = starshipData.wookieeStarships;

    const fetchStarships = vi.fn(() => {
        return starships;
    });

    const fetchWookieeStarships = vi.fn(() => {
        return wookieeStarships;
    });

    beforeEach(() => {
        setActivePinia(createPinia());

        router = createRouter({
            history: createWebHistory(),
            routes: routes,
        });

        appStore = useAppStore();
        store = useStarshipsStore();
    });

    it('fetches the list of starships', async() => {
        const starships = fetchStarships();

        // set starships on store
        store.fetchedStarships = starships;
        store.isFetchingStarships = false;

        wrapper = mount(StarshipsView, {
            global: {
                plugins: [router]
            }
        });

        expect(fetchStarships).toHaveBeenCalledOnce();
        expect(wrapper.html()).toContain(starships[0].name);
    });

    it('fetches the list of wookiee starships', async() => {
        const wookieeStarships = fetchWookieeStarships();

        // set starships on store
        store.fetchedStarships = wookieeStarships;
        store.isFetchingStarships = false;

        // set wookiee encoding
        appStore.isWookieeEncoding = true;

        wrapper = mount(StarshipsView, {
            global: {
                plugins: [router]
            }
        });

        expect(fetchWookieeStarships).toHaveBeenCalledOnce();
        expect(wrapper.html()).toContain(wookieeStarships[0].whrascwo);
    });
});
