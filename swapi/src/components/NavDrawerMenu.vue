<template>
    <v-list
        density="compact"
        nav
    >
        <v-list-item
            prepend-icon="mdi-home"
            title="Home"
            value="home"
            :to="{ name: 'home' }"
            :active="navItemIsActive('home')"
        />
        <v-list-item
            prepend-icon="mdi-earth"
            title="Planets"
            value="planets"
            :to="{ name: 'planets' }"
            :active="navItemIsActive('planets')"
        />
        <v-list-item
            prepend-icon="mdi-rocket"
            title="Starships"
            value="starships"
            :to="{ name: 'starships' }"
            :active="navItemIsActive('starships')"
        />
        <v-list-item
            prepend-icon="mdi-car-side"
            title="Vehicles"
            value="vehicles"
            :to="{ name: 'vehicles' }"
            :active="navItemIsActive('vehicles')"
        />
        <v-list-item
            prepend-icon="mdi-account-group"
            title="People"
            value="people"
            :to="{ name: 'people' }"
            :active="navItemIsActive('people')"
        />
        <v-list-item
            prepend-icon="mdi-movie-roll"
            title="Films"
            value="films"
            :to="{ name: 'films' }"
            :active="navItemIsActive('films')"
        />
        <v-list-item
            prepend-icon="mdi-dna"
            title="Species"
            value="species"
            :to="{ name: 'species' }"
            :active="navItemIsActive('species')"
        />
    </v-list>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();

function navItemIsActive(routeName : string) : boolean {
    if (routeName == 'home') {
        return route.name == routeName;
    } else if (routeName == 'planets') {
        return route.name == routeName || route.name == 'planet details';
    } else if (routeName == 'people') {
        return route.name == routeName || route.name == 'people details';
    } else if (routeName == 'films') {
        return route.name == routeName || route.name == 'film details';
    } else if (routeName == 'starships') {
        return route.name == routeName || route.name == 'starship details';
    } else if (routeName == 'vehicles') {
        return route.name == routeName || route.name == 'vehicle details';
    } else if (routeName == 'species') {
        return route.name == routeName || route.name == 'specie details';
    }
    return false;
}
</script>
<style>
</style>
