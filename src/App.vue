<script setup>
import Navbar from './components/Navbar.vue'
</script>

<template>
  <Navbar />
  <main class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 gap-4">
    <router-view />
  </main>
</template>