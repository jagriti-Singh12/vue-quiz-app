<template>
  <div class="timer-track">
    <div class="timer-fill" :class="{ urgent: seconds <= 10 }"
         :style="{ width: percent + '%' }"/>
  </div>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({ seconds: Number, total: Number })
const percent = computed(() => Math.round((props.seconds / props.total) * 100))
</script>

<style scoped>
.timer-track {
  height: 3px;
  background: rgba(255,255,255,0.1);
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 2rem;
}
.timer-fill {
  height: 100%;
  background: #a78bfa;
  border-radius: 2px;
  transition: width 1s linear, background 0.4s ease;
}
.timer-fill.urgent { background: #f87171; }
</style>