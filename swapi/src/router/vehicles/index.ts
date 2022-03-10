export default [{
    path: '/vehicles',
    component: () => import('@/views/vehicles/VehiclesMain.vue'),
    meta : {
        title: 'Vehicles Main - Star Wars API'
    },
    children: [
        {
            path: '',
            name: 'vehicles',
            component: () => import('@/views/vehicles/VehiclesView.vue'),
            meta: {
                title: 'Vehicles - Star Wars API'
            }
        },
        {
            path: ':id',
            name: 'vehicle details',
            component: () => import('@/views/vehicles/VehicleDetails.vue'),
            meta: {
                title: 'Vehicle Details - Star Wars API'
            },
            props: true
        }
    ]
}];
