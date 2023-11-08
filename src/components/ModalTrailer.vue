<script setup>
import { ref } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'

defineProps(['movie'])

const openDetail = ref(false)

function getTrailerValue(results) {
    var trailer
    Object.keys(results).forEach(key => {
        if (results[key]['name'].toLowerCase().includes('trailer')) {
            trailer = results[key]['key']
        }
    })
    return trailer || results[0].key
}
</script>

<template>
    <button type="button" @click="openDetail = true"
        class="gap-2 text-white bg-emerald-600 hover:bg-emerald-700 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded text-md px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round"
                d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
        </svg>
        Trailer
    </button>

    <TransitionRoot as="template" :show="openDetail">
        <Dialog as="div" class="relative z-10" @close="openDetail = false">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
                leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                <div
                    class="fixed inset-0 bg-gray-500 dark:bg-gray-800 bg-opacity-75 dark:bg-opacity-75 transition-opacity" />
            </TransitionChild>

            <div class="fixed inset-0 z-10 w-screen overflow-y-auto">

                <div class=" flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <TransitionChild as="template" enter="ease-out duration-300"
                        enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
                        leave-from="opacity-100 translate-y-0 sm:scale-100"
                        leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">

                        <DialogPanel
                            class="relative transform overflow-hidden rounded-lg backdrop-blur-sm bg-opacity-[.85] bg-white dark:bg-gray-900 text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-lg">

                            <div class="px-2 py-4">

                                <div class="sm:flex sm:items-start">
                                    <button type="button" @click="openDetail = false"
                                        class="absolute z-20 top-3 right-2.5 text-gray-400 bg-gray-200 hover:text-gray-900 dark:bg-gray-600 dark:hover:text-white rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
                                        data-modal-hide="popup-modal">
                                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                            fill="none" viewBox="0 0 14 14">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                                stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                        </svg>
                                        <span class="sr-only">Close modal</span>
                                    </button>

                                    <div class="w-full">
                                        <DialogTitle as="h3"
                                            class="text-base text-center font-semibold leading-6 text-gray-900 dark:text-white">
                                            {{ movie.original_title }}
                                        </DialogTitle>
                                        <div class="responsive-container overflow-hidden mt-12" style="padding-top: 56.25%">

                                            <iframe class="responsive-iframe absolute top-0 left-0 w-full h-full"
                                                :src="`https://www.youtube.com/embed/` + getTrailerValue(movie.videos.results)"
                                                title="" frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                allowFullScreen>
                                            </iframe>

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