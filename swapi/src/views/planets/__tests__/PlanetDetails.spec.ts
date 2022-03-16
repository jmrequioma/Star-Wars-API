import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import { useAppStore } from '@/stores/app/index';
import { useEntityStore } from '@/stores/index';
import { createRouter, createWebHistory, type Router } from 'vue-router';
import { planetData } from '@/tests/planets/data';

import PlanetDetails from '../PlanetDetails.vue';

import { routes } from '@/router';

describe('PlanetDetails', () => {
    let wrapper : VueWrapper;
    let router : Router;
    let appStore;
    let store;

    const planets = planetData.planets;

    const wookieePlanets = planetData.wookieePlanets;

    const fetchPlanetsDetails = vi.fn(() => {
        return planets[0];
    });

    const fetchWookieePlanetsDetails = vi.fn(() => {
        return wookieePlanets[0];
    });

    beforeEach(() => {
        setActivePinia(createPinia());

        router = createRouter({
            history: createWebHistory(),
            routes: routes,
        });

        appStore = useAppStore();
        store = useEntityStore();
    });

    it('fetches the details of a selected planets', async() => {
        const planets = fetchPlanetsDetails();

        // set film on store
        store.entity = planets;
        store.isFetchingDetails = false;

        wrapper = mount(PlanetDetails, {
            global: {
                plugins: [router]
            }
        });

        expect(fetchPlanetsDetails).toHaveBeenCalledOnce();
        expect(wrapper.html()).toContain(planets.name);
    });

    it('fetches the list of wookiee films', async() => {
        const planets = fetchWookieePlanetsDetails();

        appStore.isWookieeEncoding = true;
        // set film on store
        store.entity = planets;
        store.isFetchingDetails = false;

        wrapper = mount(PlanetDetails, {
            global: {
                plugins: [router]
            }
        });

        expect(fetchWookieePlanetsDetails).toHaveBeenCalledOnce();
        expect(wrapper.html()).toContain(planets.whrascwo);
    });
});
