<template>
    <div class="table-container">
        <v-table>
            <template v-slot:default>
                <thead>
                    <tr>
                        <template v-if="!showDetails">
                            <th
                                class="table-header"
                            >
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
                                {{ displayData(entity) }}
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
                                                :to="relatedEntityLink(data, key)"
                                            >
                                                {{ data }}
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
import { useTranslateWookiee } from '@/composables/translateWookiee';

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
    if (!appStore.isWookieeEncoding) {
        return route.name == 'films' ? 'Title' : 'Name';
    } else {
        let title = translateEnglishToWookie('title');
        let name = translateEnglishToWookie('name');
        return route.name == 'films' ? title : name;
    }
});

const noneDisplay = computed(() => {
    return appStore.isWookieeEncoding ? '' : 'None';
});

const { translateWookieeToEnglish, translateEnglishToWookie } = useTranslateWookiee();

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
            return data.name || '';
        } else {
            return data.title || '';
        }
    } else {
        // films
        let films = translateEnglishToWookie('films');
        if (property != films) {
            // name
            let name = translateEnglishToWookie('name');

            return findValue(data, name);
        } else {
            // title
            let title = translateEnglishToWookie('title');

            return findValue(data, title);
        }
    }
}

function relatedEntityLink(data : object, key : object) {
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
    let modifiedUrl = data;
    if (typeof(key) == 'string') {
        modifiedUrl = key;
    }
    // console.log(data, key);
    console.log('modified url: ----------', modifiedUrl);
    if (data.url || data.hurcan) {
        let { entityId, entityName } = useExtractId(modifiedUrl);
        const translatedWookieeWord = translateWookieeToEnglish(entityName.value);
        if (entityName.value == 'people' || translatedWookieeWord == 'people') {
            link.name = 'people details';
        } else if (entityName.value == 'films' || translatedWookieeWord == 'films') {
            link.name = 'film details';
        } else if (entityName.value == 'planets' || translatedWookieeWord == 'planets') {
            link.name = 'planet details';
        } else if (entityName.value == 'starships' || translatedWookieeWord == 'starships') {
            link.name = 'starship details';
        } else if (entityName.value == 'vehicles' || translatedWookieeWord == 'vehicles') {
            link.name = 'vehicle details';
        } else if (entityName.value == 'species' || translatedWookieeWord == 'species') {
            link.name = 'specie details';
        }
        link.params.id = entityId.value;
        console.log('link-----------', link);
    }

    return link;
}

function displayData(entity : object) {
    if (!appStore.isWookieeEncoding) {
        return entity.name || entity.title;
    } else {
        let name = translateEnglishToWookie('name');
        let title = translateEnglishToWookie('title');
        // find for the name and title in wookiee since
        // the object has wookiee properties
        for (let property in entity) {
            if (name == property || title == property) {
                return entity[property];
            }
        }
        return '';
    }
}

function findValue(entity : object, toFind : string) {
    /**
     * @param {object} entity entity to loop through
     * @param {string} toFind word to find within the entity
     */
    for (let property in entity) {
        if (toFind == property) {
            return entity[property] || '';
        }
    }
    return null;

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
