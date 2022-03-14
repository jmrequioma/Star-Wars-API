import { describe, it, expect, beforeEach } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import { useAppStore } from '@/stores/app/index';
import { usePlanetsStore } from '@/stores/planets/index';
import { createRouter, createWebHistory, type Router } from 'vue-router';

import DataTable from '../DataTable.vue';

import { routes } from '@/router';

describe('DataTable', () => {
    let wrapper : VueWrapper;
    let router : Router;

    beforeEach(() => {
        setActivePinia(createPinia());

        router = createRouter({
            history: createWebHistory(),
            routes: routes,
        });

        wrapper = mount(DataTable, {
            global: {
                plugins: [router]
            }
        });
    });

    it('displays the list of a selected entity', async() => {
        await setUpEntityList();

        // expect entity to be displayed
        expect(wrapper.html()).toContain('A-wing');
    });

    it('displays the details of a selected entity', async() => {
        await setUpSelectedEntity();

        // expect selected entity to be displayed
        expect(wrapper.html()).toContain('A-wing');
    });

    it('displays the route url link of each related entity', async() => {
        // TODO: check the router link value

    });

    async function setUpEntityList() {
        const entitiesList = [];
        const entity = entityFactory();
        entitiesList.push(entity);

        await wrapper.setProps(
            { entities: entitiesList }
        );
        await wrapper.setProps(
            { showDetails: false }
        );
    }

    async function setUpSelectedEntity() {
        const entity = entityFactory();

        await wrapper.setProps(
            { selectedEntity: entity }
        );
        await wrapper.setProps(
            { showDetails: true }
        );
    }

    function entityFactory() {
        const entity = {
            name: "A-wing",
            model: "RZ-1 A-wing Interceptor",
            manufacturer: "Alliance Underground Engineering, Incom Corporation",
            cost_in_credits: "175000",
            length: "9.6",
            max_atmosphering_speed: "1300",
            crew: "1",
            passengers: "0",
            cargo_capacity: "40",
            consumables: "1 week",
            hyperdrive_rating: "1.0",
            MGLT: "120",
            starship_class: "Starfighter",
            pilots: [
                "https://swapi.dev/api/people/29/"
            ],
            films: [
                "https://swapi.dev/api/films/3/"
            ],
            created: "2014-12-18T11:16:34.542000Z",
            edited: "2014-12-20T21:23:49.907000Z",
            url: "https://swapi.dev/api/starships/28/"
        };
        return entity;
    }
});
