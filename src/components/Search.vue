<script>
import SearchForm from '../components/SearchForm.vue'
import store from '../store/index'
import { mapState } from 'vuex'

export default {
    name: 'Home',
    store,
    components: { SearchForm },

    methods: {
        addMovieToFavourites(payload) {
            return store.dispatch('addMovieToFavourites', payload)
        },
    },
    computed: {
        ...mapState(['moviesLoaded']),
    },
};
</script>

<template>
    <section>
            <SearchForm />

            <ul class="absolute bg-white">
                <li class="movieInstance" v-for="movie in moviesLoaded" :key="movie.imdbID">
                    <p class="movieTitle">Title: {{ movie.original_title }}</p>
                    <p class="movieTitle">Title: {{ movie.Poster }}</p>
                    <router-link class="seeMore" :to="{ name: 'MovieDetail', params: { id: movie.id } }">See
                        more</router-link>

                    <button class="favouriteButton" @click="
                        addMovieToFavourites({
                            title: movie.original_title,
                            id: movie.id,
                        })
                        ">
                        Add to favourite
                    </button>
                </li>
            </ul>
        </section>
</template>