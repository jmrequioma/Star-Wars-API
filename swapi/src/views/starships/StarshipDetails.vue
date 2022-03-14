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
import { useAppStore } from '@/stores/app';
import { useFetchRelatedEntities } from '@/composables/fetchRelatedEntities';
import { constants } from '@/lib/constants/index.js';

import { computed } from 'vue';

const props = defineProps({
    id: String
});

const store = useEntityStore();
const appStore = useAppStore();

const selectedStarshipUrl = computed(() => {
    let api = `${constants.baseUrl}starships/${props.id}/`;
    return appStore.isWookieeEncoding ? `${api}?format=wookiee` : api;
});

const { isFetchingRelatedEntities } = useFetchRelatedEntities(selectedStarshipUrl);
</script>
<style>
</style>
