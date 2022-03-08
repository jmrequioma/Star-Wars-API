export default [{
    path: '/people',
    component: () => import('@/views/people/PeopleMain.vue'),
    meta : {
        title: 'People Main - Star Wars API'
    },
    children: [
        {
            path: '',
            name: 'people',
            component: () => import('@/views/people/PeopleView.vue'),
            meta: {
                title: 'People - Star Wars API'
            }
        },
        {
            path: ':id',
            name: 'people details',
            component: () => import('@/views/people/PeopleDetails.vue'),
            meta: {
                title: 'People Details - Star Wars API'
            },
            props: true
        }
    ]
}];
