import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import { useAppStore } from '@/stores/app/index';
import { usePlanetsStore } from '@/stores/planets';
import { createRouter, createWebHistory, type Router } from 'vue-router';
import { planetData } from '@/tests/planets/data';

import PlanetsView from '../PlanetsView.vue';

import { routes } from '@/router';

describe('PlanetsView', () => {
    let wrapper : VueWrapper;
    let router : Router;
    let appStore;
    let store;

    const planets = planetData.planets;

    const wookieePlanets = planetData.wookieePlanets;

    const fetchPlanets = vi.fn(() => {
        return planets;
    });

    const fetchWookieePlanets = vi.fn(() => {
        return wookieePlanets;
    });

    beforeEach(() => {
        setActivePinia(createPinia());

        router = createRouter({
            history: createWebHistory(),
            routes: routes,
        });

        appStore = useAppStore();
        store = usePlanetsStore();
    });

    it('fetches the list of planets', async() => {
        const planets = fetchPlanets();

        // set planets on store
        store.fetchedPlanets = planets;
        store.isFetchingPlanets = false;

        wrapper = mount(PlanetsView, {
            global: {
                plugins: [router]
            }
        });

        expect(fetchPlanets).toHaveBeenCalledOnce();
        expect(wrapper.html()).toContain(planets[0].name);
    });

    it('fetches the list of wookiee planets', async() => {
        const wookieePlanets = fetchWookieePlanets();

        // set planets on store
        store.fetchedPlanets = wookieePlanets;
        store.isFetchingPlanets = false;

        // set wookiee encoding
        appStore.isWookieeEncoding = true;

        wrapper = mount(PlanetsView, {
            global: {
                plugins: [router]
            }
        });

        expect(fetchWookieePlanets).toHaveBeenCalledOnce();
        expect(wrapper.html()).toContain(wookieePlanets[0].whrascwo);
    });
});
