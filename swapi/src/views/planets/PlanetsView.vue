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
// import { useEntityDetails } from '@/composables/useEntityDetails';

import DataTable from '@/components/DataTable.vue';

const store = usePlanetsStore();
const planets = ref([]);
const selectedPlanetUrl = ref('');
const selectedPlanet = ref({});

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

async function openDetails(url : string) {
    selectedPlanetUrl.value = url;
    try {
        let res = await store.fetchPlanetDetails(url);
        selectedPlanet.value = res.data;
    } catch (error) {
        console.error('fetching selected planet failed', error);
    }
}
</script>
<style>
</style>
