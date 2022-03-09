<template>
    <div class="d-flex justify-center">
        <DataTable
            v-if="!store.isFetchingPeople"
            @open-details="openDetails"
            @fetch-more="fetchMore"
            :show-details="false"
            :entities="store.people"
        />
        <PageLoaderVue v-else />
    </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';
import { usePeopleStore } from '@/stores/people';
import { useRouter } from 'vue-router';
import { useExtractId } from '@/composables/extractId';

import DataTable from '@/components/DataTable.vue';
import PageLoaderVue from '@/components/PageLoader.vue';

const store = usePeopleStore();
const router = useRouter();

onMounted(() => {
    if (!store.fetchedPeople.length) {
        store.isFetchingPeople = true;
        // fetch only if empty
        getPeople();
    }
});

function getPeople() {
    store.fetchPeople();
}

function openDetails(url : string) {
    // extract the id from the url
    // to pass it as id on router params
    const { entityId } = useExtractId(url);
    router.push(
        {
            name: 'people details',
            params: {
                id: entityId.value
            }
        }
    );
}

function fetchMore() {
    if (store.page < (store.peopleCount / 10)) {
        store.page++;
        getPeople();
    }
}
</script>
<style>
</style>
