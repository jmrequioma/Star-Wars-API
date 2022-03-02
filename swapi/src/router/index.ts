import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

import PlanetsRoutes from './planets';

export const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
        meta: {
            title: 'Home - Star Wars API'
        }
    },
    ...PlanetsRoutes
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

router.beforeEach((to, from, next) => {
    document.title = to.meta.title as string;
    next();
});
export default router;
