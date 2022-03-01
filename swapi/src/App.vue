<template>
	<v-app>
        <v-navigation-drawer app
            v-model="drawer"
        >
            <NavDrawerMenu />
        </v-navigation-drawer>
        <v-app-bar app
            color="black"
            density="compact"
        >
            <v-app-bar-title>Explore</v-app-bar-title>
            <template v-slot:prepend>
                <v-app-bar-nav-icon
                    color="black"
                    @click.stop="drawer = !drawer"
                />
            </template>
        </v-app-bar>
        <v-main class="body">
            <v-container fluid>
                <HomeView @search="drawer=true"/>
            </v-container>
        </v-main>
        <SiteFooter />
    </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import NavDrawerMenu from './components/NavDrawerMenu.vue';
import HomeView from './views/HomeView.vue';
import SiteFooter from './components/SiteFooter.vue';

const drawer = ref(false);

</script>
<style>
    .body {
        height: 100vh;
    }
</style>
