<template>
    <div class="d-flex justify-center">
        <DataTable
            v-if="!store.isFetchingFilms"
            @open-details="openDetails"
            @fetch-more="fetchMore"
            :show-details="false"
            :entities="store.films"
        />
        <PageLoaderVue v-else />
    </div>
</template>
<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { useFilmsStore } from '@/stores/films';
import { useAppStore } from '@/stores/app';
import { useRouter } from 'vue-router';
import { useExtractId } from '@/composables/extractId';

import DataTable from '@/components/DataTable.vue';
import PageLoaderVue from '@/components/PageLoader.vue';

const store = useFilmsStore();
const appStore = useAppStore();
const router = useRouter();

onMounted(() => {
    if (!store.fetchedFilms.length) {
        store.isFetchingFilms = true;
        // fetch only if empty
        getFilms();
    }
});

watch(
    () => appStore.isWookieeEncoding,
    () => {
        // reset the state if translation
        // is needed
        store.isFetchingFilms = true;
        store.page = 1;
        store.fetchedFilms = [];
        getFilms();
    }
);

function getFilms() {
    if (!appStore.isWookieeEncoding) {
        store.fetchFilms();
    } else {
        store.fetchWookieeFilms();
    }
}

function openDetails(url : string) {
    // extract the id from the url
    // to pass it as id on router params
    const { entityId } = useExtractId(url);
    router.push(
        {
            name: 'film details',
            params: {
                id: entityId.value
            }
        }
    );
}

function fetchMore() {
    if (store.page < (store.filmsCount / 10)) {
        store.page++;
        getFilms();
    }
}
</script>
<style>
</style>
