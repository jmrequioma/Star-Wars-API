import { describe, it, expect, beforeEach } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import { useAppStore } from '@/stores/app/index';
import { usePlanetsStore } from '@/stores/planets/index';

import DataTable from '../DataTable.vue';

describe('DataTable', () => {
    let wrapper : VueWrapper;

    beforeEach(() => {
        setActivePinia(createPinia());
        const store = useAppStore();
        const planetStore = usePlanetsStore();
        wrapper = mount(DataTable, {
            props: {
                entities: setUpEntityList(),
            }
        });
    });

    const fetchEntity = entities[0];

    it('displays the list of a selected entity', () => {
        // expect something
    });

    function setUpEntityList() {
        const entitiesList = [];

        const entity = entityFactory();

        return entity;
    }

    function entityFactory() {
        return {
            "name": "A-wing",
            "model": "RZ-1 A-wing Interceptor",
            "manufacturer": "Alliance Underground Engineering, Incom Corporation",
            "cost_in_credits": "175000",
            "length": "9.6",
            "max_atmosphering_speed": "1300",
            "crew": "1",
            "passengers": "0",
            "cargo_capacity": "40",
            "consumables": "1 week",
            "hyperdrive_rating": "1.0",
            "MGLT": "120",
            "starship_class": "Starfighter",
            "pilots": [
                "https://swapi.dev/api/people/29/"
            ],
            "films": [
                "https://swapi.dev/api/films/3/"
            ],
            "created": "2014-12-18T11:16:34.542000Z",
            "edited": "2014-12-20T21:23:49.907000Z",
            "url": "https://swapi.dev/api/starships/28/"
        };
    }
});
