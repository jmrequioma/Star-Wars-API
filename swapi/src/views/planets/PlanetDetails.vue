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

import { computed, onMounted } from 'vue';

const props = defineProps({
    id: String
});

const selectedPlanetUrl = computed(() => {
    return `https://swapi.dev/api/planets/${props.id}`;
});
const { selectedEntity, error } = useFetch(selectedPlanetUrl);


onMounted(() => {
    if (error.value) {
        console.error('Fetching planet failed:', error.value);
    }
});
</script>
<style>
</style>