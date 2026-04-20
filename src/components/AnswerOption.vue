<template>
  <button class="option" :class="state" :disabled="disabled" @click="$emit('select', answer)">
    <span class="letter">{{ letter }}</span>
    <span class="text">{{ answer }}</span>
  </button>
</template>

<script setup>
defineProps({
  answer:   String,
  letter:   String,
  state:    String,   // '' | 'correct' | 'wrong' | 'dimmed'
  disabled: Boolean,
})
defineEmits(['select'])
</script>

<style scoped>
.option {
  display: flex;
  align-items: center;
  gap: 14px;
  width: 100%;
  padding: 14px 18px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 12px;
  color: #f0eff4;
  font-size: 15px;
  text-align: left;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s, opacity 0.2s;
}
.option:hover:not(:disabled) {
  background: rgba(167,139,250,0.12);
  border-color: rgba(167,139,250,0.4);
}
.option:disabled { cursor: default; }
.letter {
  width: 28px; height: 28px;
  border-radius: 50%;
  background: rgba(255,255,255,0.08);
  display: flex; align-items: center; justify-content: center;
  font-size: 12px; font-weight: 600; flex-shrink: 0;
}
.option.correct { background: rgba(52,211,153,0.15); border-color: #34d399; color: #6ee7b7; }
.option.correct .letter { background: #34d399; color: #022c22; }
.option.wrong   { background: rgba(248,113,113,0.15); border-color: #f87171; color: #fca5a5; }
.option.wrong .letter   { background: #f87171; color: #450a0a; }
.option.dimmed  { opacity: 0.35; }
</style>