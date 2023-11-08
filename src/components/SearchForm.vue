<script>
import store from '../store/index'

export default {
    name: 'SearchForm',
    data() {
        return {
            movie: '',
        };
    },
    methods: {
        fetchData(movieTitle) {
            return store.dispatch(`fetchMovies`, movieTitle);
        },
    },
};
</script>

<template>
    <form @submit.prevent="fetchData(movie)">
        <div class="flex">
            <div class="relative w-full">
                <input type="search" v-model="movie" id="search-dropdown"
                    class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-lg border-2 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none focus:border-white focus:ring-white focus:bg-gray-100 dark:focus:bg-gray-600 focus:shadow-lg"
                    placeholder="Search Movies...">
                <button type="submit"
                    class="absolute top-0 right-0 p-2.5 text-sm font-medium h-full text-white bg-emerald-700 rounded-r-lg border border-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">
                    <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                    <span class="sr-only">Search</span>
                </button>
            </div>
        </div>
    </form>
</template>