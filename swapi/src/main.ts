import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index';
import vuetify from './plugins/vuetify';
import { createPinia } from "pinia";
import mitt from 'mitt';
import { loadFonts } from './plugins/webfontloader';

const emitter = mitt();

loadFonts();

const app = createApp(App);
app.use(router);
app.use(vuetify);
app.use(createPinia());
app.provide('emitter', emitter);

app.mount('#app');
