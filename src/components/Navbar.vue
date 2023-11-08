<script setup>
import { useDark, useToggle } from '@vueuse/core'
import { ref } from 'vue'
import Logo from '../assets/logo.png'
import Light from '../assets/light.svg'
import Dark from '../assets/dark.svg'
import ModalInfo from './ModalInfo.vue'

const isDark = useDark()
const toggleDark = useToggle(isDark)
const showMenu = ref(false)
</script>

<template>
    <nav class="bg-white border-gray-200 dark:bg-gray-800 shadow-lg dark:shadow-gray-600">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4 gap-4">
            <RouterLink :to="{ name: 'home' }" class="flex items-center">
                <img class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white h-10 py-1 my-1" :src="Logo" alt="Movies"/>
            </RouterLink>
            
            <div class="flex md:order-2">
                <ModalInfo />
                <button @click="toggleDark()">
                    <img :src="isDark ? Dark : Light" :key="isDark"
                        class="hover:brightness-50 dark:hover:brightness-125 grid justify-items-end p-2 w-10 h-10">
                </button>
                <button data-collapse-toggle="navbar-default" type="button" @click="showMenu = !showMenu"
                    class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-200/50 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600/50"
                    aria-controls="navbar-default" aria-expanded="false">
                    <span class="sr-only">Open main menu</span>
                    <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 17 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M1 1h15M1 7h15M1 13h15" />
                    </svg>
                </button>
            </div>

            <div :class="showMenu ? '' : 'hidden md:block'" class="w-full md:w-auto" id="navbar-default">
                <ul
                    class="text-lg flex flex-col p-2 md:p-0 md:flex-row md:space-x-8 md:mt-0 text-gray-500 dark:text-gray-400">
                    <li>
                        <RouterLink :to="{ name: 'home' }"
                            active-class="sm:border-b-[3px] border-gray-400 text-gray-900 dark:text-gray-200"
                            class="h-10 inline-flex items-center px-2 py-7 font-semibold leading-5 hover:text-gray-900 dark:hover:text-gray-200 focus:outline-none transition duration-150 ease-in-out">
                            Home
                        </RouterLink>
                    </li>
                    <li>
                        <RouterLink :to="{ name: 'favorites' }"
                            active-class="sm:border-b-[3px] border-gray-400 text-gray-900 dark:text-gray-200"
                            class="h-10 inline-flex items-center px-2 py-7 font-semibold leading-5 hover:text-gray-900 dark:hover:text-gray-200 focus:outline-none transition duration-150 ease-in-out">
                            Favorites
                        </RouterLink>
                    </li>

                </ul>
            </div>
        </div>
    </nav>
</template>