<template>
    <div class="input-container">
        <v-text-field
            v-model.trim="searchInput"
            v-on:keyup="onInput"
            label="Search"
            variant="outlined"
            clearable
            clear-icon="mdi-close"
        />
    </div>
    <div class="d-flex justify-center">
        <DataTable
            v-if="!store.isFetchingFilms && store.films.length"
            @open-details="openDetails"
            @fetch-more="fetchMore"
            :show-details="false"
            :entities="store.films"
        />
        <PageLoaderVue v-else-if="store.isFetchingFilms" />
        <div v-else-if="!store.isFetchingFilms && !store.films.length"
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
import { useFilmsStore } from '@/stores/films';
import { useAppStore } from '@/stores/app';
import { useRouter } from 'vue-router';
import { useExtractId } from '@/composables/extractId';
import  { useDebouncedRef }  from '@/composables/debouncedRef';

import DataTable from '@/components/DataTable.vue';
import PageLoaderVue from '@/components/PageLoader.vue';

const store = useFilmsStore();
const appStore = useAppStore();
const router = useRouter();
const { debounce } = useDebouncedRef();

const searchInput = toRef(store, 'searchInput');

onMounted(() => {
    resetState();
    getFilms();
});

appStore.$onAction(
    ({
        toggleWookieeSwitch,
        after
    }) => {
        after(() => {
            resetState();
            getFilms();
        });
    }
);

function onInput() {
    resetState();
    debounce(() => {
        getFilms();
    }, 850);
}

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
    if (store.page < (store.filmsCount / 10) && !store.searchInput) {
        store.page++;
        getFilms();
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
