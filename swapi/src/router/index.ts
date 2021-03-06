import { createRouter, createWebHistory } from 'vue-router';

import PlanetsRoutes from './planets';
import PeopleRoutes from './people';
import FilmsRoutes from './films';
import StarshipsRoutes from './starships';
import VehiclesRoutes from './vehicles';
import SpeciesRoutes from './species';

export const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/HomeView.vue'),
        meta: {
            title: 'Home - Star Wars API'
        }
    },
    ...PlanetsRoutes,
    ...PeopleRoutes,
    ...FilmsRoutes,
    ...StarshipsRoutes,
    ...VehiclesRoutes,
    ...SpeciesRoutes
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
