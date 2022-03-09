export default [{
    path: '/starships',
    component: () => import('@/views/starships/StarshipsMain.vue'),
    meta : {
        title: 'Starships Main - Star Wars API'
    },
    children: [
        {
            path: '',
            name: 'starships',
            component: () => import('@/views/starships/StarshipsView.vue'),
            meta: {
                title: 'Starships - Star Wars API'
            }
        },
        {
            path: ':id',
            name: 'starship details',
            component: () => import('@/views/starships/StarshipDetails.vue'),
            meta: {
                title: 'Starship Details - Star Wars API'
            },
            props: true
        }
    ]
}];
