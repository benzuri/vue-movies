<script setup>
import NoImage from '../assets/no-image.png'
import ModalDetail from './ModalDetail.vue'
import store from '../store/index'

const imageUrl = import.meta.env.VITE_API_IMAGE_URL

defineProps(['movie', 'favorites'])

function addMovieToFavourites(payload) {
    return store.dispatch('addMovieToFavourites', payload);
}
function removeMovieFavourite(payload) {
    return store.dispatch('removeMovieFavourite', payload);
}
</script>

<template>
    <li>
        <div
            class="relative block w-full rounded bg-gray-200 dark:bg-gray-800 group hover:shadow-lg hover:dark:shadow-gray-600 border border-transparent hover:border-gray-400 hover:dark:border-gray-500">
            <img class="rounded absolute inset-0 object-cover w-full h-full group-hover:opacity-20 group-hover:blur-[2px] duration-300"
                loading="lazy" :src="imageUrl + movie.poster_path" @error="(e) => (e.target.src = NoImage)" />
            <div class="relative">
                <div class="mt-0 h-96 sm:h-80 transition-all transform 
                                opacity-0 
                                group-hover:opacity-100 duration-500">

                    <div class="h-full w-full flex flex-col justify-between">

                        <div
                            class="flex  w-full h-full text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                            <router-link :to="{ name: 'movie-detail', params: { id: movie.id } }" class="w-full p-5">
                                <h5>{{ movie.original_title }}</h5>
                            </router-link>
                        </div>

                        <div class="flex gap-2 px-5 pb-5">

                            <button v-if="!favorites.some(favorite => favorite.id === movie.id)" :key="movie.id"
                                class="hover:bg-gray-400/50 rounded-lg p-1" @click="addMovieToFavourites({
                                    id: movie.id,
                                    original_title: movie.original_title,
                                    poster_path: movie.poster_path,
                                    overview: movie.overview
                                })
                                    ">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                    stroke="currentColor" class="w-8 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                                </svg>
                            </button>

                            <button v-if="favorites.some(favorite => favorite.id === movie.id)" :key="movie.id"
                                class="hover:bg-gray-400/50 rounded-lg p-1" @click="removeMovieFavourite(movie.id)
                                    ">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                    stroke="currentColor" class="w-8 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M3 3l1.664 1.664M21 21l-1.5-1.5m-5.485-1.242L12 17.25 4.5 21V8.742m.164-4.078a2.15 2.15 0 011.743-1.342 48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185V19.5M4.664 4.664L19.5 19.5" />
                                </svg>
                            </button>

                            <router-link
                                class="flex-1 text-center bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded"
                                :to="{ name: 'movie-detail', params: { id: movie.id } }"><span>More</span></router-link>

                            <ModalDetail :movie="movie" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </li>
</template>