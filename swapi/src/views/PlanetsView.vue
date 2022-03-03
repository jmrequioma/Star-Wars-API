<template>
    <DataTable :headers="headers" :entities="planets"/>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { usePlanetsStore } from '@/stores/planets/index';

import DataTable from '@/components/DataTable.vue';

const store = usePlanetsStore();
const planets = ref([]);
const headers = ['Name', 'Population'];

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
</script>
<style>
</style>
