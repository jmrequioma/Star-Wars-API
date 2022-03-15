import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import { useAppStore } from '@/stores/app/index';
import { useEntityStore } from '@/stores/index';
import { createRouter, createWebHistory, type Router } from 'vue-router';
import { peopleData } from '@/tests/people';

import PeopleDetails from '../PeopleDetails.vue';

import { routes } from '@/router';

describe('PeopleDetails', () => {
    let wrapper : VueWrapper;
    let router : Router;
    let appStore;
    let store;

    const people = peopleData.people;

    const wookieePeople = peopleData.wookieePeople;

    const fetchPeopleDetails = vi.fn(() => {
        return people[0];
    });

    const fetchWookieePeopleDetails = vi.fn(() => {
        return wookieePeople[0];
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

    it('fetches the details of a selected people', async() => {
        const people = fetchPeopleDetails();

        // set film on store
        store.entity = people;
        store.isFetchingDetails = false;

        wrapper = mount(PeopleDetails, {
            global: {
                plugins: [router]
            }
        });

        expect(fetchPeopleDetails).toHaveBeenCalledOnce();
        expect(wrapper.html()).toContain(people.name);
    });

    it('fetches the list of wookiee films', async() => {
        const people = fetchWookieePeopleDetails();

        appStore.isWookieeEncoding = true;
        // set film on store
        store.entity = people;
        store.isFetchingDetails = false;

        wrapper = mount(PeopleDetails, {
            global: {
                plugins: [router]
            }
        });

        expect(fetchWookieePeopleDetails).toHaveBeenCalledOnce();
        expect(wrapper.html()).toContain(people.whrascwo);
    });
});
