<template>
    <div class="table-container">
        <v-table>
            <template v-slot:default>
                <thead>
                    <tr>
                        <template v-if="!showDetails">
                            <th>
                                {{ headerDisplay }}
                            </th>
                        </template>
                        <template v-else>
                            <th
                                v-for="(value, key) in selectedEntity"
                                :key="key"
                                class="table-header"
                            >
                                {{ key }}
                            </th>
                        </template>
                    </tr>
                </thead>
                <tbody>
                    <template v-if="!showDetails">
                        <tr
                            v-for="entity in entities"
                            :key="entity.name"
                            @click="goToDetails(entity.url || entity.hurcan)"
                        >
                            <td>
                                {{ entity.name || entity.title || entity.whrascwo || entity.aoahaoanwo }}
                            </td>
                        </tr>
                    </template>
                    <template v-else>
                        <tr>
                            <td
                                v-for="(key, property) in selectedEntity"
                                :key="`${key}-${property}-key`"
                            >
                                <template v-if="relatedEntitiesCol.includes(property)">
                                    <template v-if="key.length">
                                        <div
                                            v-for="data in key"
                                            :key="`${data}-key`"
                                            class="related-entity-data"
                                        >
                                            <router-link
                                                :to="relatedEntityLink(data)"
                                            >
                                                {{ displayRelatedEntities(data, property) }}
                                            </router-link>
                                        </div>
                                    </template>
                                    <template v-else>
                                        {{ noneDisplay }}
                                    </template>
                                </template>
                                <template v-else>
                                    {{ key }}
                                </template>
                            </td>
                        </tr>
                    </template>
                </tbody>
            </template>
        </v-table>
    </div>
</template>
<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { constants } from '@/lib/constants/index.js';
import { useRoute } from 'vue-router';
import { useExtractId } from '@/composables/extractId';
import { useAppStore } from '@/stores/app';

const route = useRoute();
const emit = defineEmits([
    'openDetails', 'fetchMore'
]);

const appStore = useAppStore();

defineProps({
    showDetails: Boolean,
    entities: Array,
    selectedEntity: Object
});

const relatedEntitiesCol = computed(() => {
    return constants.entities.concat(constants.wookieeEntities);
});

const headerDisplay = computed(() => {
    return route.name == 'films' ? 'Title' : 'Name';
});

const noneDisplay = computed(() => {
    return appStore.isWookieeEncoding ? 'aaaaahnr' : 'None';
});

onMounted(() => {
    const listElm = document.querySelector('.table-container');
    if (listElm) {
        listElm.addEventListener('scroll', e => {
            if (listElm.scrollTop + listElm.clientHeight >= listElm.scrollHeight) {
                emit('fetchMore');
            }
        });
    }
});

function goToDetails(url : string) {
    /* this function opens the details page of
        selected entity on table row via emission
    */
    emit('openDetails', url);
}

function displayRelatedEntities(data : object, property : string) {
    if (!appStore.isWookieeEncoding) {
        if (property != 'films') {
            return data.name ? `${data.name}` : '';
        } else {
            return data.title ? `${data.title}` : '';
        }
    } else {
        // films
        if (property != 'wwahanscc') {
            return data.whrascwo ? `${data.whrascwo}` : '';
        } else {
            // title
            return data.aoahaoanwo ? `${data.aoahaoanwo}` : '';
        }
    }
}

function relatedEntityLink(data : object) {
    /*
        returns the router link
        for the related entity
    */

    let link = {
        name: '',
        params: {
            id: '1'
        }
    };

    if (data.url || data.hurcan) {
        // TODO: add logic to check for these constants
        let { entityId, entityName } = useExtractId(data.url || data.hurcan);
        if (entityName.value == 'people' || entityName.value == 'pilots'
            || entityName.value == 'akwoooakanwo' || entityName.value == 'akahanooaoc'
            || entityName.value == 'oaacrarcraoaaoworcc') {
            link.name = 'people details';
        } else if (entityName.value == 'films' || entityName.value == 'wwahanscc') {
            link.name = 'film details';
        } else if (entityName.value == 'planets' || entityName.value == 'akanrawhwoaoc') {
            link.name = 'planet details';
        } else if (entityName.value == 'starships' || entityName.value == 'caorarccacahakc') {
            link.name = 'starship details';
        } else if (entityName.value == 'vehicles' || entityName.value == 'howoacahoaanwoc') {
            link.name = 'vehicle details';
        } else if (entityName.value == 'species' || entityName.value == 'cakwooaahwoc') {
            link.name = 'specie details';
        }
        link.params.id = entityId.value;
    }

    return link;
}
</script>
<style lang="scss">
    .table-container {
        min-width: 80vw;
        max-height: 480px;
        overflow-y: auto;

        .table-header {
            text-transform: capitalize;
        }
    }

    .related-entity-data {
        min-width: 200px;
    }

    td {
        min-width: 200px;
    }
</style>
