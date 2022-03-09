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
import { onMounted } from 'vue';
import { useSpeciesStore } from '@/stores/species';
import { useRouter } from 'vue-router';
import { useExtractId } from '@/composables/extractId';

import DataTable from '@/components/DataTable.vue';
import PageLoaderVue from '@/components/PageLoader.vue';

const store = useSpeciesStore();
const router = useRouter();

onMounted(() => {
    if (!store.fetchedSpecies.length) {
        store.isFetchingSpecies = true;
        // fetch only if empty
        getSpecies();
    }
});

function getSpecies() {
    store.fetchSpecies();
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
