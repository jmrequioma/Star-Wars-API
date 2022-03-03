<template>
    <div class="d-flex justify-center">
        <div class="table-container">
            <v-table>
                <template v-slot:default>
                    <thead>
                        <tr>
                            <template v-if="!details">
                                <th>
                                    Name
                                </th>
                            </template>
                            <template v-else>
                                <th
                                    v-for="(value, key) in entities[0]"
                                    :key="key"
                                >
                                    {{ key }}
                                </th>
                            </template>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="entity in entities"
                            :key="entity.name"
                            @click="goToDetails(entity.url)"
                        >
                            <template v-if="!details">
                                <td>
                                    {{ entity.name }}
                                </td>
                            </template>
                            <template v-else>
                                <td
                                    v-for="item in entity"
                                    :key="`${item}-key`"
                                >
                                    {{ item }}
                                </td>
                            </template>
                        </tr>
                    </tbody>
                </template>
            </v-table>
        </div>
    </div>
</template>
<script setup lang="ts">

const emit = defineEmits(['openDetails']);

defineProps({
    /* determines whether data table should show all details
    of the entity
    */
    details: {
        type: Boolean,
        required: false,
        default: false
    },

    entities: {
        type: Array,
        required: true
    }
});

function goToDetails(url : string) {
    /* this function opens the details page of
        selected entity on table row
    */
    emit('openDetails', url);
}
</script>
<style>
    .table-container {
        min-width: 80vw;
        max-height: 480px;
        overflow-y: auto;
    }
</style>