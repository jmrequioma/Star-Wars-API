import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import { useAppStore } from '@/stores/app/index';
import { useVehiclesStore } from '@/stores/vehicles';
import { createRouter, createWebHistory, type Router } from 'vue-router';
import { vehicleData } from '@/tests/vehicles/data';

import VehiclesView from '../VehiclesView.vue';

import { routes } from '@/router';

describe('VehiclesView', () => {
    let wrapper : VueWrapper;
    let router : Router;
    let appStore;
    let store;

    const vehicles = vehicleData.vehicles;

    const wookieeVehicles = vehicleData.wookieeVehicles;

    const fetchVehicles = vi.fn(() => {
        return vehicles;
    });

    const fetchWookieeVehicles = vi.fn(() => {
        return wookieeVehicles;
    });

    beforeEach(() => {
        setActivePinia(createPinia());

        router = createRouter({
            history: createWebHistory(),
            routes: routes,
        });

        appStore = useAppStore();
        store = useVehiclesStore();
    });

    it('fetches the list of vehicles', async() => {
        const vehicles = fetchVehicles();

        // set vehicles on store
        store.fetchedVehicles = vehicles;
        store.isFetchingVehicles = false;

        wrapper = mount(VehiclesView, {
            global: {
                plugins: [router]
            }
        });

        expect(fetchVehicles).toHaveBeenCalledOnce();
        expect(wrapper.html()).toContain(vehicles[0].name);
    });

    it('fetches the list of wookiee vehicles', async() => {
        const wookieeVehicles = fetchWookieeVehicles();

        // set vehicles on store
        store.fetchedVehicles = wookieeVehicles;
        store.isFetchingVehicles = false;

        // set wookiee encoding
        appStore.isWookieeEncoding = true;

        wrapper = mount(VehiclesView, {
            global: {
                plugins: [router]
            }
        });

        expect(fetchWookieeVehicles).toHaveBeenCalledOnce();
        expect(wrapper.html()).toContain(wookieeVehicles[0].whrascwo);
    });
});
