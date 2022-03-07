<template>
    <DataTable
        :show-details="true"
        :selected-entity="selectedEntity"
    />
    <div></div>
</template>
<script setup lang="ts">
import DataTable from '@/components/DataTable.vue';
import { usePlanetsStore } from '@/stores/planets/index';

import { computed, onMounted, ref } from 'vue';

const props = defineProps({
    id: String
});

const store = usePlanetsStore();

const selectedEntity = ref(null);
const selectedPlanetUrl = computed(() => {
    return `https://swapi.dev/api/planets/${props.id}`;
});

onMounted(async() => {
    await fetchPlanet(selectedPlanetUrl.value);
    // let modifiedEntity = useFetchRelatedEntities(selectedEntity);
    fetchRelatedEntities();
});

async function fetchPlanet(url : string) {
    try {
        let res = await store.fetchEntityDetails(url);
        selectedEntity.value = res.data;
    } catch (error) {
        console.error('fetching planet details failed', error);
    }
}

function fetchRelatedEntities() {
    for (let key in selectedEntity.value) {
        console.log(`${key}: ${selectedEntity.value[key]}`);
        if ((key == 'residents')) {
            console.log('residents', selectedEntity.value[key]);
            fetchRelatedEntityName(selectedEntity.value[key], key);
        }
    }
}

async function fetchRelatedEntityName(url: object, key : string) {
    console.log('inside');


    for (let property in url) {
        let individualUrl = url[property];
        try {
            let res = await store.fetchEntityDetails(individualUrl);
            let fetchedEntity = res.data;
            selectedEntity.value[key] = fetchedEntity;
        } catch (error) {
            console.error('fetching related entities details failed', error);
        }
    }
}

</script>
<style>
</style>
