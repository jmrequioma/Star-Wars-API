import { describe, it, expect, beforeEach } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';

import { createRouter, createWebHistory, type Router } from 'vue-router';

import NavDrawerMenu from '../NavDrawerMenu.vue';

import { routes } from '@/router';

describe('NavDrawerMenu', () => {
    let wrapper : VueWrapper;
    let router : Router;

    beforeEach(() => {
        router = createRouter({
            history: createWebHistory(),
            routes: routes,
        });

        wrapper = mount(NavDrawerMenu, {
            global: {
                plugins: [router]
            }
        });
    });

    it('renders a component via routing', async() => {
        router.push({ name: 'planets'});
        await router.isReady();
        expect(router.currentRoute.value.name).toBe('planets');
    });
});
