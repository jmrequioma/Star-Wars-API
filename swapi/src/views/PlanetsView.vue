<template>
    <div class="d-flex justify-center">
        <div class="table-container">
            <v-table color="gray">
                <template v-slot:default>
                    <thead>
                        <tr>
                            <th class="text-left">
                                Name
                            </th>
                            <th class="text-left">
                                Population
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="planet in planets"
                            :key="planet.name"
                        >
                            <td>{{ planet.name }}</td>
                            <td>{{ planet.population }}</td>
                        </tr>
                    </tbody>
                </template>
            </v-table>
        </div>
    </div>
</template>
<script setup lang="ts">
const planets = [
        {
        name: 'Tatooine',
        population: 20000,
        },
        {
        name: 'Tatooine',
        population: 20000,
        },
        {
        name: 'Tatooine',
        population: 20000,
        },
        {
        name: 'Tatooine',
        population: 20000,
        },
        {
        name: 'Tatooine',
        population: 20000,
        },
        {
        name: 'Tatooine',
        population: 20000,
        },
        {
        name: 'Tatooine',
        population: 20000,
        },
];
</script>
<style>
    .table-container {
        min-width: 80vw;
    }
</style>