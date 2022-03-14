<template>
    <div class="d-flex justify-center">
        <DataTable
            v-if="!store.isFetchingPlanets"
            @open-details="openDetails"
            @fetch-more="fetchMore"
            :show-details="false"
            :entities="store.planets"
        />
        <PageLoaderVue v-else />
    </div>
</template>
<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { usePlanetsStore } from '@/stores/planets/index';
import { useAppStore } from '@/stores/app';
import { useRouter } from 'vue-router';
import { useExtractId } from '@/composables/extractId';

import DataTable from '@/components/DataTable.vue';
import PageLoaderVue from '@/components/PageLoader.vue';

const store = usePlanetsStore();
const appStore = useAppStore();
const router = useRouter();

onMounted(() => {
    if (!store.fetchedPlanets.length) {
        store.isFetchingPlanets = true;
        // fetch only if empty
        getPlanets();
    }
});

watch(
    () => appStore.isWookieeEncoding,
    () => {
        // reset the state if translation
        // is needed
        store.isFetchingPlanets = true;
        store.page = 1;
        store.fetchedPlanets = [];
        getPlanets();
    }
);

function getPlanets() {
    if (!appStore.isWookieeEncoding) {
        store.fetchPlanets();
    } else {
        store.fetchWookieePlanets();
    }
}

function openDetails(url : string) {
    // extract the id from the url
    // to pass it as id on router params
    const { entityId } = useExtractId(url);
    router.push(
        {
            name: 'planet details',
            params: {
                id: entityId.value
            }
        }
    );
}

function fetchMore() {
    if (store.page < (store.planetsCount / 10)) {
        store.page++;
        getPlanets();
    }
}
</script>
<style>
</style>
