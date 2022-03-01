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
                <router-view />
            </v-container>
        </v-main>
        <SiteFooter />
    </v-app>
</template>

<script setup lang="ts">
import type { Emitter } from 'mitt';
import { inject, ref } from 'vue';
import NavDrawerMenu from './components/NavDrawerMenu.vue';
import SiteFooter from './components/SiteFooter.vue';

type Events = {
 search: void;
};

const emitter : Emitter<Events> = inject('emitter') as Emitter<Events>;
const drawer = ref(false);
emitter.on('search', () => {
    drawer.value = true;
});
</script>
<style>
    .body {
        height: 100vh;
    }
</style>
