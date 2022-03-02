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
                    class="mx-4 ig-btn"
                    icon="mdi-instagram"
                    variant="plain"
                    :href="igInfo.url"
                    target="_blank"
                />
                <v-btn
                    class="mx-4 linkedin-btn"
                    icon="mdi-linkedin"
                    variant="plain"
                    :href="linkedinInfo.url"
                    target="_blank"
                />
                <v-btn
                    class="mx-4 twitter-btn"
                    icon="mdi-twitter"
                    variant="plain"
                    :href="twitterInfo.url"
                    target="_blank"
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
import { constants } from '@/lib/constants/index.js';

type SocialLink = {
    site: string;
    url: string;
};

const igInfo = getSocialLink('instagram');
const linkedinInfo = getSocialLink('linkedin');
const twitterInfo = getSocialLink('twitter');

function getSocialLink(key : string) : SocialLink {
    return constants.socialLinks.find(
        (link : SocialLink) => link.site == key
    );
}
</script>
<style>
</style>