<template>
    <div class="d-flex justify-center">
        <div class="table-container">
            <v-table>
                <template v-slot:default>
                    <thead>
                        <tr>
                            <th class="text-left">
                                {{ headers[0] }}
                            </th>
                            <th class="text-left">
                                {{ headers[1] }}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="entity in entities"
                            :key="entity.name"
                            @click="openDetails"
                        >
                            <td>{{ entity.name }}</td>
                            <td>{{ entity.population }}</td>
                        </tr>
                    </tbody>
                </template>
            </v-table>
        </div>
    </div>
</template>
<script setup lang="ts">

defineProps({
    headers: {
        type: Array,
        required: true
    },

    entities: {
        type: Array,
        required: true
    }
});

function openDetails() {
    /* this function opens the details page of
        selected entity on table row
    */

}
</script>
<style>
    .table-container {
        min-width: 80vw;
        max-height: 480px;
        overflow-y: auto;
    }
</style>