import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import { useAppStore } from '@/stores/app/index';
import { useEntityStore } from '@/stores/index';
import { createRouter, createWebHistory, type Router } from 'vue-router';
import { vehicleData } from '@/tests/vehicles/data';

import VehicleDetails from '../VehicleDetails.vue';

import { routes } from '@/router';

describe('VehicleDetails', () => {
    let wrapper : VueWrapper;
    let router : Router;
    let appStore;
    let store;

    const vehicles = vehicleData.vehicles;

    const wookieeVehicles = vehicleData.wookieeVehicles;

    const fetchVehiclesDetails = vi.fn(() => {
        return vehicles[0];
    });

    const fetchWookieeVehiclesDetails = vi.fn(() => {
        return wookieeVehicles[0];
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

    it('fetches the details of a selected vehicles', async() => {
        const vehicles = fetchVehiclesDetails();

        // set film on store
        store.entity = vehicles;
        store.isFetchingDetails = false;

        wrapper = mount(VehicleDetails, {
            global: {
                plugins: [router]
            }
        });

        expect(fetchVehiclesDetails).toHaveBeenCalledOnce();
        expect(wrapper.html()).toContain(vehicles.name);
    });

    it('fetches the list of wookiee films', async() => {
        const vehicles = fetchWookieeVehiclesDetails();

        appStore.isWookieeEncoding = true;
        // set film on store
        store.entity = vehicles;
        store.isFetchingDetails = false;

        wrapper = mount(VehicleDetails, {
            global: {
                plugins: [router]
            }
        });

        expect(fetchWookieeVehiclesDetails).toHaveBeenCalledOnce();
        expect(wrapper.html()).toContain(vehicles.whrascwo);
    });
});
