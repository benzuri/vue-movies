<script>
import { mapState } from 'vuex'
import store from '../store'
import CardBase from '../components/CardBase.vue'

export default {
    name: 'Favourites',
    store,
    components: { CardBase },

    computed: {
        ...mapState(['moviesFavourites']),
    },

    methods: {
        removeMovieFavourite(movieId) {
            return store.dispatch('removeMovieFavourite', movieId);
        },
    },
};
</script>

<template>
    <Transition>
        <section class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded bg-gray-400/50 p-4"
            v-if="!moviesFavourites.length">
            No favorites
        </section>

        <section v-else>
            <ul class="flex grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
                <CardBase v-for="movie in moviesFavourites" :key="movie.id" :movie="movie" :favorites="moviesFavourites" />
            </ul>
        </section>
    </Transition>
</template>

