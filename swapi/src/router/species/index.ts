export default [{
    path: '/species',
    component: () => import('@/views/species/SpeciesMain.vue'),
    meta : {
        title: 'Species Main - Star Wars API'
    },
    children: [
        {
            path: '',
            name: 'species',
            component: () => import('@/views/species/SpeciesView.vue'),
            meta: {
                title: 'Species - Star Wars API'
            }
        },
        {
            path: ':id',
            name: 'specie details',
            component: () => import('@/views/species/SpecieDetails.vue'),
            meta: {
                title: 'Specie Details - Star Wars API'
            },
            props: true
        }
    ]
}];
