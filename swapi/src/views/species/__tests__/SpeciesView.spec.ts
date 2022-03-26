import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import { useAppStore } from '@/stores/app/index';
import { useSpeciesStore } from '@/stores/species';
import { createRouter, createWebHistory, type Router } from 'vue-router';
import { specieData } from '@/tests/species/data';

import SpeciesView from '../SpeciesView.vue';

import { routes } from '@/router';

describe('SpeciesView', () => {
    let wrapper : VueWrapper;
    let router : Router;
    let appStore;
    let store;

    const species = specieData.species;

    const wookieeSpecies = specieData.wookieeSpecies;

    const fetchSpecies = vi.fn(() => {
        return species;
    });

    const fetchWookieeSpecies = vi.fn(() => {
        return wookieeSpecies;
    });

    beforeEach(() => {
        setActivePinia(createPinia());

        router = createRouter({
            history: createWebHistory(),
            routes: routes,
        });

        appStore = useAppStore();
        store = useSpeciesStore();
    });

    it('fetches the list of species', async() => {
        const species = fetchSpecies();

        // set species on store
        store.fetchedSpecies = species;
        store.isFetchingSpecies = false;

        wrapper = mount(SpeciesView, {
            global: {
                plugins: [router]
            }
        });

        expect(fetchSpecies).toHaveBeenCalledOnce();
        expect(wrapper.html()).toContain(species[0].name);
    });

    it('fetches the list of wookiee species', async() => {
        const wookieeSpecies = fetchWookieeSpecies();

        // set species on store
        store.fetchedSpecies = wookieeSpecies;
        store.isFetchingSpecies = false;

        // set wookiee encoding
        appStore.isWookieeEncoding = true;

        wrapper = mount(SpeciesView, {
            global: {
                plugins: [router]
            }
        });

        expect(fetchWookieeSpecies).toHaveBeenCalledOnce();
        expect(wrapper.html()).toContain(wookieeSpecies[0].whrascwo);
    });
});
