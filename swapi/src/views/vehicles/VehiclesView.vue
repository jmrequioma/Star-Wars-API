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
            v-if="!store.isFetchingVehicles && store.vehicles.length"
            @open-details="openDetails"
            @fetch-more="fetchMore"
            :show-details="false"
            :entities="store.vehicles"
        />
        <PageLoaderVue v-else-if="store.isFetchingVehicles" />
        <div v-else-if="!store.isFetchingVehicles && !store.vehicles.length"
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
import { useVehiclesStore } from '@/stores/vehicles';
import { useAppStore } from '@/stores/app';
import { useRouter } from 'vue-router';
import { useExtractId } from '@/composables/extractId';
import  { useDebouncedRef }  from '@/composables/debouncedRef';

import DataTable from '@/components/DataTable.vue';
import PageLoaderVue from '@/components/PageLoader.vue';

const store = useVehiclesStore();
const appStore = useAppStore();
const router = useRouter();
const { debounce } = useDebouncedRef();

const searchInput = toRef(store, 'searchInput');

onMounted(() => {
    resetState();
    getVehicles();
});

appStore.$onAction(
    ({
        toggleWookieeSwitch,
        after
    }) => {
        after(() => {
            resetState();
            getVehicles();
        });
    }
);

function onInput() {
    resetState();
    debounce(() => {
        getVehicles();
    }, 850);
}

function getVehicles() {
    if (!appStore.isWookieeEncoding) {
        store.fetchVehicles();
    } else {
        store.fetchWookieeVehicles();
    }
}

function openDetails(url : string) {
    // extract the id from the url
    // to pass it as id on router params
    const { entityId } = useExtractId(url);
    router.push(
        {
            name: 'vehicle details',
            params: {
                id: entityId.value
            }
        }
    );
}

function fetchMore() {
    if (store.page < (store.vehiclesCount / 10) && !store.searchInput) {
        store.page++;
        getVehicles();
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
