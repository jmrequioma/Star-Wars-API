import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import { useAppStore } from '@/stores/app/index';
import { useEntityStore } from '@/stores/index';
import { createRouter, createWebHistory, type Router } from 'vue-router';
import { filmData } from '@/tests/films/data';

import FilmDetails from '../FilmDetails.vue';

import { routes } from '@/router';

describe('FilmDetails', () => {
    let wrapper : VueWrapper;
    let router : Router;
    let appStore;
    let store;

    const films = filmData.films;

    const wookieeFilms = filmData.wookieeFilms;

    const fetchFilmDetails = vi.fn(() => {
        return films[0];
    });

    const fetchWookieeFilmDetails = vi.fn(() => {
        return wookieeFilms[0];
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

    it('fetches the details of a selected film', async() => {
        const film = fetchFilmDetails();

        // set film on store
        store.entity = film;
        store.isFetchingDetails = false;

        wrapper = mount(FilmDetails, {
            global: {
                plugins: [router]
            }
        });

        expect(fetchFilmDetails).toHaveBeenCalledOnce();
        expect(wrapper.html()).toContain(film.title);
    });

    it('fetches the list of wookiee films', async() => {
        const film = fetchWookieeFilmDetails();

        appStore.isWookieeEncoding = true;
        // set film on store
        store.entity = film;
        store.isFetchingDetails = false;

        wrapper = mount(FilmDetails, {
            global: {
                plugins: [router]
            }
        });

        expect(fetchWookieeFilmDetails).toHaveBeenCalledOnce();
        expect(wrapper.html()).toContain(film.aoahaoanwo);
    });
});
