import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import { useAppStore } from '@/stores/app/index';
import { usePeopleStore } from '@/stores/people';
import { createRouter, createWebHistory, type Router } from 'vue-router';
import { peopleData } from '@/tests/people/data';

import PeopleView from '../PeopleView.vue';

import { routes } from '@/router';

describe('PeopleView', () => {
    let wrapper : VueWrapper;
    let router : Router;
    let appStore;
    let store;

    const people = peopleData.people;

    const wookieePeople = peopleData.wookieePeople;

    const fetchPeople = vi.fn(() => {
        return people;
    });

    const fetchWookieePeople = vi.fn(() => {
        return wookieePeople;
    });

    beforeEach(() => {
        setActivePinia(createPinia());

        router = createRouter({
            history: createWebHistory(),
            routes: routes,
        });

        appStore = useAppStore();
        store = usePeopleStore();
    });

    it('fetches the list of people', async() => {
        const people = fetchPeople();

        // set people on store
        store.fetchedPeople = people;
        store.isFetchingPeople = false;

        wrapper = mount(PeopleView, {
            global: {
                plugins: [router]
            }
        });

        expect(fetchPeople).toHaveBeenCalledOnce();
        expect(wrapper.html()).toContain(people[0].name);
    });

    it('fetches the list of wookiee people', async() => {
        const wookieePeople = fetchWookieePeople();

        // set people on store
        store.fetchedPeople = wookieePeople;
        store.isFetchingPeople = false;

        // set wookiee encoding
        appStore.isWookieeEncoding = true;

        wrapper = mount(PeopleView, {
            global: {
                plugins: [router]
            }
        });

        expect(fetchWookieePeople).toHaveBeenCalledOnce();
        expect(wrapper.html()).toContain(wookieePeople[0].whrascwo);
    });
});
