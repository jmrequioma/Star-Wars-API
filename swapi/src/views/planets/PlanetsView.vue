<template>
    <DataTable
        @open-details="openDetails"
        :show-details="false"
        :entities="planets"
    />
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { usePlanetsStore } from '@/stores/planets/index';
import { useRouter } from 'vue-router';
import { useExtractId } from '@/composables/extractId';

import DataTable from '@/components/DataTable.vue';

const store = usePlanetsStore();
const planets = ref([]);
const router = useRouter();

onMounted(async() => {
    getPlanets();
});

async function getPlanets() {
    // get planets from swapi
    try {
        let res = await store.fetchPlanets();
        planets.value = res.data.results;
    } catch (error) {
        console.error('fetching planets failed', error);
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
</script>
<style>
</style>
