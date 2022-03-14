<template>
    <div class="d-flex justify-center">
        <DataTable
            v-if="!store.isFetchingVehicles"
            @open-details="openDetails"
            @fetch-more="fetchMore"
            :show-details="false"
            :entities="store.vehicles"
        />
        <PageLoaderVue v-else />
    </div>
</template>
<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { useVehiclesStore } from '@/stores/vehicles';
import { useAppStore } from '@/stores/app';
import { useRouter } from 'vue-router';
import { useExtractId } from '@/composables/extractId';

import DataTable from '@/components/DataTable.vue';
import PageLoaderVue from '@/components/PageLoader.vue';

const store = useVehiclesStore();
const appStore = useAppStore();
const router = useRouter();

onMounted(() => {
    if (!store.fetchedVehicles.length) {
        store.isFetchingVehicles = true;
        // fetch only if empty
        getVehicles();
    }
});

watch(
    () => appStore.isWookieeEncoding,
    () => {
        // reset the state if translation
        // is needed
        store.isFetchingVehicles = true;
        store.page = 1;
        store.fetchedVehicles = [];
        getVehicles();
    }
);

function getVehicles() {
    if (!appStore.isWookieeEncoding) {
        store.fetchVehicles();
    } else {
        store.fetchWookieeVehicles();
    }
}

function openDetails(url : string) {
    // extract the id from the url
    // to pass it as id on router params
    const { entityId } = useExtractId(url);
    router.push(
        {
            name: 'vehicle details',
            params: {
                id: entityId.value
            }
        }
    );
}

function fetchMore() {
    if (store.page < (store.vehiclesCount / 10)) {
        store.page++;
        getVehicles();
    }
}
</script>
<style>
</style>
