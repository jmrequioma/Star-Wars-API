<template>
    <div class="input-container">
        <v-text-field
            v-model.trim="store.searchInput"
            label="Search"
            variant="outlined"
            clearable
            clear-icon="mdi-close"
        />
    </div>
    <div class="d-flex justify-center">
        <DataTable
            v-if="!store.isFetchingPlanets && store.planets.length"
            @open-details="openDetails"
            @fetch-more="fetchMore"
            :show-details="false"
            :entities="store.planets"
        />
        <PageLoaderVue v-else-if="store.isFetchingPlanets" />
        <div v-else-if="!store.isFetchingPlanets && !store.planets.length"
            class="empty-state"
        >
            <v-icon>
                mdi-magnify
            </v-icon>
            <p>No results found.</p>
        </div>
    </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';
import { usePlanetsStore } from '@/stores/planets/index';
import { useAppStore } from '@/stores/app';
import { useRouter } from 'vue-router';
import { useExtractId } from '@/composables/extractId';
import  { useDebouncedRef }  from '@/composables/debouncedRef';

import DataTable from '@/components/DataTable.vue';
import PageLoaderVue from '@/components/PageLoader.vue';

const store = usePlanetsStore();
const appStore = useAppStore();
const router = useRouter();
const { debounce } = useDebouncedRef();

onMounted(() => {
    resetState();
    getPlanets();
});

appStore.$subscribe((value) => {
    // watch for a change in the toggle
    if (value.events.key == 'isWookieeEncoding') {
        resetState();
        getPlanets();
    }
});

store.$subscribe((value) => {
    // watch for a change in the text field
    if (value.events.key == 'searchInput') {
        resetState();
        debounce(() => {
            getPlanets();
        }, 850);
    }
});

function getPlanets() {
    if (!appStore.isWookieeEncoding) {
        store.fetchPlanets();
    } else {
        store.fetchWookieePlanets();
    }
}

function openDetails(url : string) {
    // extract the id from the url
    // to pass it as id on router params
    const { entityId } = useExtractId(url);
    router.push(
        {
            name: 'planet details',
            params: {
                id: entityId.value
            }
        }
    );
}

function fetchMore() {
    if (store.page < (store.planetsCount / 10) && !store.searchInput) {
        store.page++;
        getPlanets();
    }
}

function resetState() {
    /**
     * resets the store
     * to the original state
     */

    store.isFetchingPlanets = true;
    store.page = 1;
    store.fetchedPlanets = [];

}
</script>
<style scoped lang="scss">
    .input-container {
        padding-left: 10vw;
        padding-right: 12vw;
        position: sticky;
        background-color: white;
        z-index: 1;
        width: 100%;
    }

    .empty-state {
        text-align: center;
        font-size: 32px;

        p {
            font-size: 16px;
            font-weight: 300;
        }
    }
</style>
