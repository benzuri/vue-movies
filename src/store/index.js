import { createStore } from 'vuex'
import axios from 'axios'

//Axios config to use token
axios.defaults.headers.common['Authorization'] = 'Bearer ' + import.meta.env.VITE_API_TOKEN

//Create store
const store = createStore({
    state: {
        moviesFavourites: [],
        moviesLoaded: [],
        movieDetail: {},
    },

    mutations: {
        //mutations are syncronous to change state
        addMovie(state, payload) {
            state.moviesLoaded = payload;
        },

        addMovieDetail(state, payload) {
            state.movieDetail = payload;
        },

        addMovieToFavourites(state, payload) {
            state.moviesFavourites.push(payload);            
        },

        removeMovieFavourite(state, payload) {
            state.moviesFavourites = state.moviesFavourites.filter(
                (movie) => payload !== movie.id
            );
        },
    },

    actions: {
        async fetchMovies({ commit }, title) {
            let response = await axios.get(
                import.meta.env.VITE_API_URL + `search/movie?query=` + title
            );
            commit('addMovie', response.data);
        },

        async discoverMovies({ commit }) {
            let response = await axios.get(
                import.meta.env.VITE_API_URL + `discover/movie`
            );
            commit('addMovie', response.data);
        },

        async fetchMovieId({ commit }, id) {
            let response = await axios.get(
                import.meta.env.VITE_API_URL + `movie/` + id + `?append_to_response=credits,videos,images`
            );
            commit('addMovieDetail', response.data);
        },

        clearMovieDetail({ commit }) {
            commit('addMovieDetail', {});
        },

        addMovieToFavourites({ commit }, payload) {
            commit('addMovieToFavourites', payload);
        },

        removeMovieFavourite({ commit }, payload) {
            commit('removeMovieFavourite', payload);
        },
    },

    getters: {
        getMoviesFavourites: (state) => state.moviesFavourites,
    },
    modules: {},
});

export default store;