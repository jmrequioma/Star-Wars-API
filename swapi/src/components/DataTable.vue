<template>
    <div class="table-container">
        <v-table>
            <template v-slot:default>
                <thead>
                    <tr>
                        <template v-if="!showDetails">
                            <th>
                                Name
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
                                {{ entity.name }}
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
                                            {{ displayRelatedEntities(data, property) }}
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
import { computed } from 'vue';


const emit = defineEmits(['openDetails']);

defineProps({
    showDetails: Boolean,
    entities: Array,
    selectedEntity: Object
});

const relatedEntitiesCol = computed(() => {
    return ['residents', 'films'];
});
function goToDetails(url : string) {
    /* this function opens the details page of
        selected entity on table row via emission
    */
    emit('openDetails', url);
}

function displayRelatedEntities(data : object, property : string) {
    if (property == 'residents') {
        return data.name ? `${data.name}` : '';
    }
    if (property == 'films') {
        return data.title ? `${data.title}` : '';
    }
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
</style>
