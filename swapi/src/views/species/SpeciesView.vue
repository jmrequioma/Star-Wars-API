<template>
    <div class="input-container">
        <v-text-field
            v-model.trim="searchInput"
            label="Search"
            v-on:keyup="onInput"
            variant="outlined"
            clearable
            clear-icon="mdi-close"
        />
    </div>
    <div class="d-flex justify-center">
        <DataTable
            v-if="!store.isFetchingSpecies && store.species.length"
            @open-details="openDetails"
            @fetch-more="fetchMore"
            :show-details="false"
            :entities="store.species"
        />
        <PageLoaderVue v-else-if="store.isFetchingSpecies" />
        <div v-else-if="!store.isFetchingSpecies && !store.species.length"
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
import { onMounted, toRef } from 'vue';
import { useSpeciesStore } from '@/stores/species';
import { useAppStore } from '@/stores/app';
import { useRouter } from 'vue-router';
import { useExtractId } from '@/composables/extractId';
import  { useDebouncedRef }  from '@/composables/debouncedRef';

import DataTable from '@/components/DataTable.vue';
import PageLoaderVue from '@/components/PageLoader.vue';

const store = useSpeciesStore();
const appStore = useAppStore();
const router = useRouter();
const { debounce } = useDebouncedRef();

const searchInput = toRef(store, 'searchInput');

onMounted(() => {
    if (!store.fetchedSpecies.length) {
        store.isFetchingSpecies = true;
        // fetch only if empty
        getSpecies();
    }
});

appStore.$onAction(
    ({
        toggleWookieeSwitch,
        after
    }) => {
        after(() => {
            resetState();
            getSpecies();
        });
    }
);

function onInput() {
    resetState();
    debounce(() => {
        getSpecies();
    }, 850);
}

function getSpecies() {
    if (!appStore.isWookieeEncoding) {
        store.fetchSpecies();
    } else {
        store.fetchWookieeSpecies();
    }
}

function openDetails(url : string) {
    // extract the id from the url
    // to pass it as id on router params
    const { entityId } = useExtractId(url);
    router.push(
        {
            name: 'specie details',
            params: {
                id: entityId.value
            }
        }
    );
}

function fetchMore() {
    if (store.page < (store.speciesCount / 10) && !store.searchInput) {
        store.page++;
        getSpecies();
    }
}

function resetState() {
    /**
     * resets the store
     * to the original state
     */

    store.setToInitialState();

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
