<template>
    <div class="d-flex justify-center">
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
                                    :key="`${property}-key`"
                                >
                                    <template v-if="property == 'residents'">
                                        <template
                                            v-for="data in key"
                                            :key="`${data}-key`"
                                        >
                                            <!-- TODO: fix spacing -->
                                            {{ data.name }}
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
    </div>
</template>
<script setup lang="ts">

const emit = defineEmits(['openDetails']);

defineProps({
    showDetails: Boolean,
    entities: Array,
    selectedEntity: Object
});

function goToDetails(url : string) {
    /* this function opens the details page of
        selected entity on table row via emission
    */
    emit('openDetails', url);
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
</style>
