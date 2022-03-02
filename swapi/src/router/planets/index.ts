import HomeView from '../../views/HomeView.vue';

export default [{
    path: '/planets',
    name: 'planets',
    component: HomeView,   // TODO: change this to PlanetView
    meta : {
        title: 'Planets - Star Wars API'
    }
}];
