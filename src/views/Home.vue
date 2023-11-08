<script>
import SearchForm from '../components/SearchForm.vue'
import CardBase from '../components/CardBase.vue'
import store from '../store/index'
import { mapState } from 'vuex'

export default {
    name: 'Home',
    store,
    components: { SearchForm, CardBase },

    methods: {
        addMovieToFavourites(payload) {
            return store.dispatch('addMovieToFavourites', payload);
        },
        discoverMovies() {
            return store.dispatch('discoverMovies');
        }
    },
    beforeMount() {
        this.discoverMovies()
    },
    computed: {
        ...mapState(['moviesLoaded']),
        ...mapState(['moviesFavourites']),
    },
};
</script>

<template>
    <section class="max-w-2xl mx-auto w-full">
        <SearchForm />
    </section>

    <Transition>
        <section class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded bg-gray-400/50 p-4"
            v-if="moviesLoaded.total_results == 0">
            No results
        </section>

        <section v-else>
            <ul class="flex grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
                <CardBase v-for="movie in moviesLoaded.results" :key="movie.id" :movie="movie" :favorites="moviesFavourites" />
            </ul>
        </section>
    </Transition>
</template>
