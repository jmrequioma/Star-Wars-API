export default [{
    path: '/planets',
    component: () => import('@/views/planets/PlanetsMain.vue'),
    meta : {
        title: 'Planets Main - Star Wars API'
    },
    children: [
        {
            path: '',
            name: 'planets',
            component: () => import('@/views/planets/PlanetsView.vue'),
            meta: {
                title: 'Planets - Star Wars API'
            }
        },
        {
            path: ':id',
            name: 'planet details',
            component: () => import('@/views/planets/PlanetDetails.vue'),
            meta: {
                title: 'Planet Details - Star Wars API'
            },
            props: true
        }
    ]
}];
