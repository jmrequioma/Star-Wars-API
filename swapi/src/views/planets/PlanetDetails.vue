<template>
    <div class="d-flex justify-center">
        <DataTable
            v-if="!store.isFetchingDetails"
            :show-details="true"
            :selected-entity="store.selectedEntity"
        />
        <PageLoader v-else />
    </div>
</template>
<script setup lang="ts">
import DataTable from '@/components/DataTable.vue';
import PageLoader from '@/components/PageLoader.vue';

import { useEntityStore } from '@/stores/index';

import { computed, onMounted, watch } from 'vue';

const props = defineProps({
    id: String
});

const store = useEntityStore();

const selectedPlanetUrl = computed(() => {
    return `https://swapi.dev/api/planets/${props.id}`;
});


const relatedEntitiesCol = computed(() => {
    return ['residents', 'films'];
});

watch(
    () => store.entity,
    () => {
        fetchRelatedEntities();
    }
);

onMounted(() => {
    store.isFetchingDetails = true;
    fetchPlanet(selectedPlanetUrl.value);
});

function fetchPlanet(url : string) {
    store.fetchEntityDetails(url);
}

function fetchRelatedEntities() {
    for (let key in store.selectedEntity) {
        if ((relatedEntitiesCol.value.includes(key))) {
            fetchRelatedEntityName(store.selectedEntity[key], key);
        }
    }
}

async function fetchRelatedEntityName(url: object, key : string) {
    let relatedEntities = [];
    for (let property in url) {
        let individualUrl = url[property];
        try {
            let res = await store.fetchRelatedEntityDetails(individualUrl);
            let fetchedEntity = res.data;
            relatedEntities.push(fetchedEntity);
        } catch (error) {
            console.error('fetching related entities details failed', error);
        } finally {
            store.isFetchingDetails = false;
        }
    }
    store.entity[key] = relatedEntities;
}

</script>
<style>
</style>
