<template>
    <div class="d-flex justify-center">
        <DataTable
            v-if="!store.isFetchingSpecies"
            @open-details="openDetails"
            @fetch-more="fetchMore"
            :show-details="false"
            :entities="store.species"
        />
        <PageLoaderVue v-else />
    </div>
</template>
<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { useSpeciesStore } from '@/stores/species';
import { useAppStore } from '@/stores/app';
import { useRouter } from 'vue-router';
import { useExtractId } from '@/composables/extractId';

import DataTable from '@/components/DataTable.vue';
import PageLoaderVue from '@/components/PageLoader.vue';

const store = useSpeciesStore();
const appStore = useAppStore();
const router = useRouter();

onMounted(() => {
    if (!store.fetchedSpecies.length) {
        store.isFetchingSpecies = true;
        // fetch only if empty
        getSpecies();
    }
});

watch(
    () => appStore.isWookieeEncoding,
    () => {
        // reset the state if translation
        // is needed
        store.isFetchingSpecies = true;
        store.page = 1;
        store.fetchedSpecies = [];
        getSpecies();
    }
);

function getSpecies() {
    if (!appStore.isWookieeEncoding) {
        store.fetchSpecies();
    } else {
        store.fetchSpecies();
    }
}

function openDetails(url : string) {
    // extract the id from the url
    // to pass it as id on router params
    const { entityId } = useExtractId(url);
    router.push(
        {
            name: 'specie details',
            params: {
                id: entityId.value
            }
        }
    );
}

function fetchMore() {
    if (store.page < (store.speciesCount / 10)) {
        store.page++;
        getSpecies();
    }
}
</script>
<style>
</style>
