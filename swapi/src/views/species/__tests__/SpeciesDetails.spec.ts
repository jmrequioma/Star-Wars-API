import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import { useAppStore } from '@/stores/app/index';
import { useEntityStore } from '@/stores/index';
import { createRouter, createWebHistory, type Router } from 'vue-router';
import { specieData } from '@/tests/species/data';

import SpecieDetails from '../SpecieDetails.vue';

import { routes } from '@/router';

describe('SpecieDetails', () => {
    let wrapper : VueWrapper;
    let router : Router;
    let appStore;
    let store;

    const species = specieData.species;

    const wookieeSpecies = specieData.wookieeSpecies;

    const fetchSpeciesDetails = vi.fn(() => {
        return species[0];
    });

    const fetchWookieeSpeciesDetails = vi.fn(() => {
        return wookieeSpecies[0];
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

    it('fetches the details of a selected species', async() => {
        const species = fetchSpeciesDetails();

        // set film on store
        store.entity = species;
        store.isFetchingDetails = false;

        wrapper = mount(SpecieDetails, {
            global: {
                plugins: [router]
            }
        });

        expect(fetchSpeciesDetails).toHaveBeenCalledOnce();
        expect(wrapper.html()).toContain(species.name);
    });

    it('fetches the list of wookiee films', async() => {
        const species = fetchWookieeSpeciesDetails();

        appStore.isWookieeEncoding = true;
        // set film on store
        store.entity = species;
        store.isFetchingDetails = false;

        wrapper = mount(SpecieDetails, {
            global: {
                plugins: [router]
            }
        });

        expect(fetchWookieeSpeciesDetails).toHaveBeenCalledOnce();
        expect(wrapper.html()).toContain(species.whrascwo);
    });
});
