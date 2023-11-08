import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import MovieDetail from '../views/MovieDetail.vue'
import Favorites from '../views/Favorites.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/favorites',
        name: 'favorites',
        component: Favorites
    },
    {
        path: '/movie/:id',
        name: 'movie-detail',
        component: MovieDetail
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;