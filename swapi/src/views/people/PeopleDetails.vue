<template>
    <div class="d-flex justify-center">
        <DataTable
            v-if="!store.isFetchingDetails && !isFetchingRelatedEntities"
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
import { useFetchRelatedEntities } from '@/composables/fetchRelatedEntities';

import { computed } from 'vue';

const props = defineProps({
    id: String
});

const store = useEntityStore();

const selectedPeopleUrl = computed(() => {
    return `https://swapi.dev/api/people/${props.id}`;
});

const { isFetchingRelatedEntities } = useFetchRelatedEntities(selectedPeopleUrl);
</script>
<style>
</style>
