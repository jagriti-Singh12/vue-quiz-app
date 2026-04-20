<template>
  <div id="app-shell">
    <RouterView v-slot="{ Component }">
      <Transition name="page" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
</script>

<style>
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: 'DM Sans', system-ui, sans-serif;
  background: #0f0f13;
  color: #f0eff4;
  min-height: 100vh;
}

#app-shell {
  max-width: 640px;
  margin: 0 auto;
  padding: 2rem 1.25rem;
  min-height: 100vh;
}

.page-enter-active,
.page-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.page-enter-from { opacity: 0; transform: translateY(16px); }
.page-leave-to   { opacity: 0; transform: translateY(-8px); }
</style>