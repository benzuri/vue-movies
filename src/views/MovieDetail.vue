<script>
import { mapState } from 'vuex'
import store from '../store'
import ModalTrailer from '../components/ModalTrailer.vue'
import noImage from '../assets/no-image.png'

const imageUrl = import.meta.env.VITE_API_IMAGE_URL

export default {
    name: 'MovieDetail',
    components: { ModalTrailer },
    store,

    data() {
        return {
            imageUrl: imageUrl,
            noImage: noImage
        };
    },

    mounted() {
        let id = this.$route.params.id;
        store.dispatch('fetchMovieId', id);
    },

    unmounted() {
        store.dispatch('clearMovieDetail');
    },

    computed: {
        ...mapState(['movieDetail']),
        ...mapState(['moviesFavourites']),
    },

    methods: {
        addMovieToFavourites(payload) {
            return store.dispatch('addMovieToFavourites', payload);
        },
        removeMovieFavourite(payload) {
            return store.dispatch('removeMovieFavourite', payload);
        },
    }
};
</script>

<template>
    <div class="w-full">

        <div class="sm:bg-gray-600 w-full h-fit sm:h-full flex flex-row flex-wrap p-3" loading="lazy"
            v-if="movieDetail.backdrop_path"
            v-bind:style="{ backgroundImage: 'url(' + imageUrl + '' + movieDetail.backdrop_path + ')' }" style="                
                    background-repeat: no-repat;
                    background-size: cover;
                    background-blend-mode: multiply;
                    display: block;
                    position: absolute;
                    top: 0;
                    left: 0;
                    opacity : 0.2;
                    z-index: -1;
            "></div>

        <article
            class=" w-full flex flex-col sm:flex-row rounded-lg shadow-lg bg-gray-600 backdrop-blur-sm bg-white/30 dark:bg-gray-900/30">
            <div class="border-[10px] border-transparent">
                <div class="sm:w-[250px]" v-if="movieDetail.poster_path">
                    <img loading="lazy" class="sm:h-96" :src="imageUrl + movieDetail.poster_path"
                        @error="(e) => (e.target.src = noImage)">
                </div>
                <div class="sm:w-[250px] animate-pulse" v-else>
                    <img class="sm:h-96 bg-gray-300 dark:bg-gray-700" :src="noImage">
                </div>
            </div>

            <div class="flex flex-col justify-between gap-4 p-3 w-full text-lg">
                <div class="flex flex-col">
                    <h5 class="max-w-full mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white h-full">
                        <p v-if="movieDetail.original_title">{{ movieDetail.original_title }}</p>
                        <p v-else class="w-[250px] max-w-full animate-pulse bg-gray-300 dark:bg-gray-700 h-6 rounded-lg">
                        </p>
                    </h5>
                    <div class="w-full mb-3 font-normal text-gray-700 dark:text-gray-400">
                        <p v-if="movieDetail.overview">{{ movieDetail.overview }}</p>
                        <div v-else class="space-y-3 pt-3">
                            <p class="w-full animate-pulse bg-gray-300 dark:bg-gray-700 h-3 w-full rounded-lg"></p>
                            <p class="w-full animate-pulse bg-gray-300 dark:bg-gray-700 h-3 w-full rounded-lg"></p>
                            <p class="w-1/3 animate-pulse bg-gray-300 dark:bg-gray-700 h-3 w-full rounded-lg"></p>
                        </div>
                    </div>

                    <div class="text-md text-gray-600 dark:text-gray-300">
                        <span v-if="movieDetail.genres" class="font-bold">Genres: </span>
                        <span v-for="(genre, index) in movieDetail.genres">
                            <template v-if="index > 0">,</template>
                            {{ genre.name }}
                        </span>
                    </div>

                    <div class="text-md text-gray-600 dark:text-gray-300">
                        <span v-if="movieDetail.release_date" class="font-bold">Release date: </span>
                        {{ movieDetail.release_date }}
                    </div>
                </div>

                <div v-if="movieDetail.original_title" class="flex flex-row gap-2">
                    <ModalTrailer v-if="movieDetail.videos.results.length" :key="movieDetail.id" :movie="movieDetail" />

                    <button v-if="!moviesFavourites.some(favorite => favorite.id === movieDetail.id)" :key="movieDetail.id"
                        class="bg-gray-400/50 rounded-lg p-2 py-3" @click="addMovieToFavourites({
                            id: movieDetail.id,
                            original_title: movieDetail.original_title,
                            poster_path: movieDetail.poster_path,
                            overview: movieDetail.overview
                        })
                            ">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-8 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                        </svg>
                    </button>

                    <button v-if="moviesFavourites.some(favorite => favorite.id === movieDetail.id)" :key="movieDetail.id"
                        class="bg-gray-400/50 rounded-lg p-2 py-3" @click="removeMovieFavourite(movieDetail.id)
                            ">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-8 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M3 3l1.664 1.664M21 21l-1.5-1.5m-5.485-1.242L12 17.25 4.5 21V8.742m.164-4.078a2.15 2.15 0 011.743-1.342 48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185V19.5M4.664 4.664L19.5 19.5" />
                        </svg>
                    </button>
                </div>
            </div>
        </article>
    </div>
</template>