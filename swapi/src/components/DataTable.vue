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
                            @click="goToDetails(entity.url)"
                        >
                            <td>
                                {{ entity.name || entity.title }}
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
                                        None
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
import { useExtractId } from '@/composables/extractId';
import { constants } from '@/lib/constants/index.js';
import { useRoute } from 'vue-router';


const route = useRoute();
const emit = defineEmits([
    'openDetails', 'fetchMore'
]);

defineProps({
    showDetails: Boolean,
    entities: Array,
    selectedEntity: Object
});

const relatedEntitiesCol = computed(() => {
    return constants.entities;
});

const headerDisplay = computed(() => {
    return route.name == 'films' ? 'Title' : 'Name';
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
    if (property == 'residents' || property == 'vehicles'
        || property == 'species' || property == 'starships'
        || property == 'characters' || property == 'planets') {
        return data.name ? `${data.name}` : '';
    } else if (property == 'films') {
        return data.title ? `${data.title}` : '';
    }
}

function relatedEntityLink(data : object) {
    /*
        returns the router link
        for the related entity
    */

    let link = {};
    let routerLinkName = '';
    if (data.url) {
        const { entityId, entityName } = useExtractId(data.url);
        if (entityName.value == 'people') {
            routerLinkName = 'people details';
        } else if (entityName.value == 'films') {
            // routerLinkName = 'film details';
        }
        link = {
            name: routerLinkName,
            params: {
                id: entityId.value
            }
        };
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
        min-width: 150px;
    }
</style>
