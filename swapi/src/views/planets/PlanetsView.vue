<template>
    <div class="d-flex justify-center">
        <DataTable
            v-if="!store.isFetchingPlanets"
            @open-details="openDetails"
            :show-details="false"
            :entities="store.planets"
        />
        <PageLoaderVue v-else />
    </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';
import { usePlanetsStore } from '@/stores/planets/index';
import { useRouter } from 'vue-router';
import { useExtractId } from '@/composables/extractId';

import DataTable from '@/components/DataTable.vue';
import PageLoaderVue from '@/components/PageLoader.vue';

const store = usePlanetsStore();
const router = useRouter();

onMounted(() => {
    store.isFetchingPlanets = true;
    getPlanets();
});

function getPlanets() {
    store.fetchPlanets();
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
</script>
<style>
</style>
