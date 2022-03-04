<template>
    <DataTable
        :show-details="true"
        :selected-entity="selectedEntity"
    />
    <div></div>
</template>
<script setup lang="ts">
import DataTable from '@/components/DataTable.vue';
import { useFetch } from '@/composables/fetch';
import { useFetchRelatedEntities } from '@/composables/fetchRelatedEntities';

import { computed, onMounted } from 'vue';

const props = defineProps({
    id: String
});

const selectedPlanetUrl = computed(() => {
    return `https://swapi.dev/api/planets/${props.id}`;
});
const { selectedEntity, error } = useFetch(selectedPlanetUrl);
const { relatedEntities } = useFetchRelatedEntities(selectedEntity);


onMounted(() => {
    if (error.value) {
        console.error('Fetching planet failed:', error.value);
    } else {
        // do something
    }


});
</script>
<style>
</style>
