import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import { useAppStore } from '@/stores/app/index';
import { useFilmsStore } from '@/stores/films/index';
import { createRouter, createWebHistory, type Router } from 'vue-router';
import { filmData } from '@/tests/films/data';

import FilmsView from '../FilmsView.vue';

import { routes } from '@/router';

describe('FilmsView', () => {
    let wrapper : VueWrapper;
    let router : Router;
    let appStore;
    let store;

    const films = filmData.films;

    const wookieeFilms = filmData.wookieeFilms;

    const fetchFilms = vi.fn(() => {
        return films;
    });

    const fetchWookieeFilms = vi.fn(() => {
        return wookieeFilms;
    });

    beforeEach(() => {
        setActivePinia(createPinia());

        router = createRouter({
            history: createWebHistory(),
            routes: routes,
        });

        appStore = useAppStore();
        store = useFilmsStore();
    });

    it('fetches the list of films', async() => {
        const films = fetchFilms();

        // set films on store
        store.fetchedFilms = films;
        store.isFetchingFilms = false;

        wrapper = mount(FilmsView, {
            global: {
                plugins: [router]
            }
        });

        expect(fetchFilms).toHaveBeenCalledOnce();
        expect(wrapper.html()).toContain(films[0].title);
    });

    it('fetches the list of wookiee films', async() => {
        const wookieeFilms = fetchWookieeFilms();

        // set films on store
        store.fetchedFilms = wookieeFilms;
        store.isFetchingFilms = false;

        // set wookiee encoding
        appStore.isWookieeEncoding = true;

        wrapper = mount(FilmsView, {
            global: {
                plugins: [router]
            }
        });

        expect(fetchWookieeFilms).toHaveBeenCalledOnce();
        expect(wrapper.html()).toContain(wookieeFilms[0].aoahaoanwo);
    });
});
