<template>
    <DataTable
        @open-details="openDetails"
        :details="false"
        :entities="planets"
    />
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { usePlanetsStore } from '@/stores/planets/index';
import { useFetch } from '@/composables/fetch';

import DataTable from '@/components/DataTable.vue';

const store = usePlanetsStore();
const planets = ref([]);
const selectedPlanetUrl = ref('');
const { selectedEntity, error } = useFetch(selectedPlanetUrl);

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
    selectedPlanetUrl.value = url;
}
</script>
<style>
</style>
