<script setup>
import { ref } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import Logo from '../assets/logo.png'
import Vite from '/vite.svg'
import Vue from '/vue.svg'

const open = ref(false)
</script>

<template>
    <button type="button" @click="open = true"
        class="p-2 stroke-gray-400 hover:stroke-gray-800 dark:stroke-gray-400 dark:hover:stroke-gray-200">
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" class="fill-current" width="24" height="24" viewBox="0 0 24 24"
                stroke-width="2" stroke="fill-current" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" fill="none" />
                <path d="M12 16v.01" fill="none" />
                <path d="M12 13a2 2 0 0 0 .914 -3.782a1.98 1.98 0 0 0 -2.414 .483" fill="none" />
            </svg>
        </div>
    </button>

    <TransitionRoot as="template" :show="open">
        <Dialog as="div" class="relative z-10" @close="open = false">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
                leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                <div
                    class="fixed inset-0 bg-gray-500 dark:bg-gray-800 bg-opacity-75 dark:bg-opacity-75 transition-opacity" />
            </TransitionChild>

            <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <TransitionChild as="template" enter="ease-out duration-300"
                        enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
                        leave-from="opacity-100 translate-y-0 sm:scale-100"
                        leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                        <DialogPanel
                            class="relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-900 text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-lg">
                            <div class="px-4 py-5 sm:p-6">
                                <div class="sm:flex sm:items-start">
                                    <button type="button" @click="open = false"
                                        class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                        data-modal-hide="popup-modal">
                                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                            fill="none" viewBox="0 0 14 14">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                                stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                        </svg>
                                        <span class="sr-only">Close modal</span>
                                    </button>

                                    <div class="w-full text-center sm:mx-8 sm:mt-0 mt-3">
                                        <img :src="Logo" alt="Logo" class="" />
                                        <DialogTitle as="h3"
                                            class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                                            Movie App with Vue JS
                                        </DialogTitle>
                                        <div class="mt-2">
                                            <p class="text-sm text-gray-500 py-2">Made with</p>
                                            <div class="flex justify-center gap-5">
                                                <img :src="Vite" alt="Vite" class="w-8 h-8" />
                                                <img :src="Vue" alt="Vue" class="w-8 h-8" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>