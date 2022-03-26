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
            <v-app-bar-title class="title">{{ appbarTitle }}</v-app-bar-title>
            <template v-slot:prepend>
                <v-app-bar-nav-icon
                    color="black"
                    @click.stop="drawer = !drawer"
                />
            </template>
            <v-spacer />
            <div
                class="d-flex justify-center mr-2"
            >
                <v-switch
                    v-model="isWookieeEncoding"
                    @change="setWookieeEncoding"
                    class="toggle"
                    hide-details
                >
                </v-switch>
                <div class="mt-4">
                    <p>See Data in Wookiee</p>
                </div>
            </div>
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
import { inject, ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import type { Emitter } from 'mitt';
import { useAppStore } from './stores/app';

import NavDrawerMenu from './components/NavDrawerMenu.vue';
import SiteFooter from './components/SiteFooter.vue';

type Events = {
 search: void;
};

const emitter : Emitter<Events> = inject('emitter') as Emitter<Events>;
const drawer = ref(false);
const route = useRoute();
const store = useAppStore();

const isWookieeEncoding = ref(false);

const appbarTitle = computed(() => {
    return route.name;
});

function setWookieeEncoding() {
    store.toggleWookieeSwitch(isWookieeEncoding.value);
}

emitter.on('search', () => {
    drawer.value = true;
});
</script>
<style scoped lang="scss">
    .body {
        height: 100vh;
    }

    .title {
        text-transform: capitalize;
    }

    .toggle {
        color: white !important;
    }

    .input__label {
        color: white;
    }
</style>
