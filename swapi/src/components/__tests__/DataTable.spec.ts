import { describe, it, expect, beforeEach } from 'vitest';
import { mount, VueWrapper, flushPromises } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import { useAppStore } from '@/stores/app/index';
import { useEntityStore } from '@/stores';
import { createRouter, createWebHistory, type Router } from 'vue-router';

import DataTable from '../DataTable.vue';

import { routes } from '@/router';

describe('DataTable', () => {
    let wrapper : VueWrapper;
    let router : Router;
    let appStore;
    let entityStore;

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

        appStore = useAppStore();
        entityStore = useEntityStore();
    });

    it('displays the list of a selected entity', async() => {
        await setUpEntityList();

        // expect entity to be displayed
        expect(wrapper.html()).toContain('A-wing');
    });

    it('displays the list of a selected wookiee entity', async() => {
        await setUpWookieeEntityList();

        expect(wrapper.html()).toContain('A-ohahwhrr');
    });

    it('displays the details of a selected entity', async() => {
        await setUpSelectedEntity();

        // expect selected entity to be displayed
        expect(wrapper.html()).toContain('A-wing');
    });

    it('displays the details of a selected wookiee entity', async() => {
        await setUpWookieeSelectedEntity();

        // expect selected wookiee entity to be displayed
        expect(wrapper.html()).toContain('A-ohahwhrr');
    });

    it('validates the route url link of a selected entity', async() => {
        const { entitiesList } = await setUpEntityList();

        // expect correct url
        const clickableRow = wrapper.find('tr.entity-display');
        clickableRow.trigger('click');

        expect(clickableRow).toBeTruthy;
        expect(entityStore.entity.url).toBe(entitiesList[0].url);

        const emitted = wrapper.emitted('openDetails');

        // assert event has been emitted
        expect(emitted).toBeTruthy();
        // assert event count
        expect(emitted.length).toBe(1);
        // assert event payload
        expect(emitted[0]).toEqual([entityStore.entity.url]);
    });

    it('validates the route url link of a selected wookiee entity', async() => {
        const { entitiesList } = await setUpWookieeEntityList();

        // expect correct url
        const clickableRow = wrapper.find('tr.entity-display');
        clickableRow.trigger('click');

        expect(clickableRow).toBeTruthy;
        expect(entityStore.entity.hurcan).toBe(entitiesList[0].hurcan);

        const emitted = wrapper.emitted('openDetails');

        // assert event has been emitted
        expect(emitted).toBeTruthy();
        // assert event count
        expect(emitted.length).toBe(1);
        // assert event payload
        expect(emitted[0]).toEqual([entityStore.entity.hurcan]);
    });

    it('validates the router link of each related entity', async() => {
        router.push(
            {
                name: 'starship details',
                params: {
                    id: '28'
                }
            }
        );
        const entity  = await setUpSelectedEntity();

        const routerLink = wrapper.find('a.router-link');
        routerLink.trigger('click');
        await flushPromises();

        expect(routerLink).toBeTruthy;
        expect(entityStore.entity).toBeNull();

        await router.isReady();

        expect(router.currentRoute.value.name).toBe('people details');
    });

    it('validates the router link of each related wookiee entity', async() => {
        router.push(
            {
                name: 'starship details',
                params: {
                    id: '28'
                }
            }
        );
        const entity  = await setUpWookieeSelectedEntity();

        const routerLink = wrapper.find('a.router-link');
        routerLink.trigger('click');
        await flushPromises();

        expect(routerLink).toBeTruthy;
        expect(entityStore.entity).toBeNull();

        await router.isReady();

        expect(router.currentRoute.value.name).toBe('people details');
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

        return {
            entitiesList,
            showDetails : false
        };
    }

    async function setUpWookieeEntityList() {
        appStore.isWookieeEncoding = true;
        const entitiesList = [];
        const entity = wookieeEntityFactory();
        entitiesList.push(entity);

        await wrapper.setProps(
            { entities: entitiesList }
        );
        await wrapper.setProps(
            { showDetails: false }
        );

        return {
            entitiesList,
            showDetails : false
        };
    }

    async function setUpSelectedEntity() {
        const entity = entityFactory();

        await wrapper.setProps(
            { selectedEntity: entity }
        );
        await wrapper.setProps(
            { showDetails: true }
        );

        return entity;
    }

    async function setUpWookieeSelectedEntity() {
        appStore.isWookieeEncoding = true;
        const entity = wookieeEntityFactory();

        await wrapper.setProps(
            { selectedEntity: entity }
        );
        await wrapper.setProps(
            { showDetails: true }
        );

        return entity;
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

    function wookieeEntityFactory() {
        const entity = {
            whrascwo: "A-ohahwhrr",
            scoowawoan: "RZ-1 A-ohahwhrr Iwhaoworcoawoakaooorc",
            scrawhhuwwraoaaohurcworc:
            "Aananahrawhoawo Uwhwaworcrrrcoohuwhwa Ewhrrahwhwoworcahwhrr, Iwhoaoosc Coorcakoorcraaoahoowh",
            oaoocao_ahwh_oarcwowaahaoc: "175000",
            anwowhrraoac: "9.6",
            scrak_raaoscoocakacworcahwhrr_cakwowowa: "1300",
            oarcwooh: "1",
            akraccwowhrrworcc: "0",
            oararcrroo_oaraakraoaahaoro: "40",
            oaoowhchuscrarhanwoc: "1 ohwowoor",
            acroakworcwarcahhowo_rcraaoahwhrr: "1.0",
            MGLT: "120",
            caorarccacahak_oaanracc: "Saorarcwwahrracaoworc",
            akahanooaoc: [
                "acaoaoakc://cohraakah.wawoho/raakah/akwoooakanwo/29/"
            ],
            wwahanscc: [
                "acaoaoakc://cohraakah.wawoho/raakah/wwahanscc/3/"
            ],
            oarcworaaowowa: "2014-12-18T11:16:34.542000Z",
            wowaahaowowa: "2014-12-20T21:23:49.907000Z",
            hurcan: "acaoaoakc://cohraakah.wawoho/raakah/caorarccacahakc/28/"
        };
        return entity;
    }
});
