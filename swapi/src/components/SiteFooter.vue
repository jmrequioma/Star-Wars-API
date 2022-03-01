<template>
    <v-footer app>
        <v-card
            elevation="0"
            rounded
            width="100%"
            class="bg-black text-center"
        >
            <v-card-text>
                <v-btn
                    class="mx-4"
                    icon="mdi-home"
                    variant="plain"
                />
                <v-btn
                    class="mx-4"
                    icon="mdi-email"
                    variant="plain"
                />
            </v-card-text>

            <v-divider color="white"></v-divider>
            <div class="d-flex justify-start">
                <v-card-text class="text-white">
                    Created by Jerome Requioma
                </v-card-text>
            </div>
        </v-card>
    </v-footer>
</template>
<script setup lang="ts">
</script>
<style>
</style>