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
import { useEntityDetails } from '@/composables/useEntityDetails';

import DataTable from '@/components/DataTable.vue';

const store = usePlanetsStore();
const planets = ref([]);
const selectedEntityUrl = ref('');
const { selectedEntity } = useEntityDetails(selectedEntityUrl.value);

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
    selectedEntityUrl.value = url;
    console.log('should be specific entry', selectedEntityUrl.value);
}
</script>
<style>
</style>
