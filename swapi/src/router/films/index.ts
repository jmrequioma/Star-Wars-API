export default [{
    path: '/films',
    component: () => import('@/views/films/FilmsMain.vue'),
    meta : {
        title: 'Films Main - Star Wars API'
    },
    children: [
        {
            path: '',
            name: 'films',
            component: () => import('@/views/films/FilmsView.vue'),
            meta: {
                title: 'Films - Star Wars API'
            }
        },
        {
            path: ':id',
            name: 'film details',
            component: () => import('@/views/films/FilmDetails.vue'),
            meta: {
                title: 'Film Details - Star Wars API'
            },
            props: true
        }
    ]
}];
