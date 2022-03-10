<template>
    <div class="d-flex justify-center">
        <DataTable
            v-if="!store.isFetchingStarships"
            @open-details="openDetails"
            @fetch-more="fetchMore"
            :show-details="false"
            :entities="store.starships"
        />
        <PageLoaderVue v-else />
    </div>
</template>
<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { useStarshipsStore } from '@/stores/starships';
import { useAppStore } from '@/stores/app';
import { useRouter } from 'vue-router';
import { useExtractId } from '@/composables/extractId';

import DataTable from '@/components/DataTable.vue';
import PageLoaderVue from '@/components/PageLoader.vue';

const store = useStarshipsStore();
const appStore = useAppStore();
const router = useRouter();

onMounted(() => {
    if (!store.fetchedStarships.length) {
        store.isFetchingStarships = true;
        // fetch only if empty
        getStarships();
    }
});

watch(
    () => appStore.isWookieeEncoding,
    () => {
        // reset the state if translation
        // is needed
        store.isFetchingStarships = true;
        store.page = 1;
        store.fetchedStarships = [];
        getStarships();
    }
);

function getStarships() {
    if (!appStore.isWookieeEncoding) {
        store.fetchStarships();
    } else {
        store.fetchWookieeStarships();
    }
}

function openDetails(url : string) {
    // extract the id from the url
    // to pass it as id on router params
    const { entityId } = useExtractId(url);
    router.push(
        {
            name: 'starship details',
            params: {
                id: entityId.value
            }
        }
    );
}

function fetchMore() {
    if (store.page < (store.starshipsCount / 10)) {
        store.page++;
        getStarships();
    }
}
</script>
<style>
</style>
