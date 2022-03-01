<template>
    <div class="home-view d-flex justify-center mt-16">
        <div class="greet-container">
            <div>
                <h1>Start searching for things in a galaxy far, far away...</h1>
            </div>
            <div class="mt-4">
                <v-btn
                    variant="outlined"
                    @click="search"
                >
                    Chewie, Hit the Hyperdrive!
                </v-btn>
            </div>
            <div class="d-flex justify-end mt-8">
                <p class="text-subtitle-2 font-italic font-weight-light quote">
                    "Search your feelings, you know it be true."
                </p>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import type { Emitter } from 'mitt';
import { inject } from 'vue';

type Events = {
 search: void;
};

const emitter : Emitter<Events> = inject('emitter') as Emitter<Events>;
function search() : void {
    emitter.emit('search');
}
</script>
<style lang="scss" scoped>
    h1 {
        font-weight: 300;
    }

    .home-view {
        left: 50%;
        right: 50%;
    }
</style>