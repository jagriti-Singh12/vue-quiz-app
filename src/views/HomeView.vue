<template>
  <div class="home">
    <div class="logo">V</div>
    <h1>Vue 3 Quiz</h1>
    <p class="sub">Test your Vue knowledge. Learn as you go.</p>

    <div class="topics">
      <button
        v-for="topic in topics"
        :key="topic.id"
        class="topic-card"
        @click="quiz.loadTopic(topic.id); router.push('/quiz')"
      >
        <span class="topic-emoji">{{ topic.emoji }}</span>
        <span class="topic-label">{{ topic.label }}</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useQuizStore } from '@/stores/useQuizStore';
import { topics } from '@/data/question';

const quiz   = useQuizStore()
const router = useRouter()
</script>

<style scoped>
.home { text-align: center; padding-top: 3rem; }
.logo {
  width: 64px; height: 64px; border-radius: 20px;
  background: #42d392; color: #002b1a;
  font-size: 32px; font-weight: 800;
  display: inline-flex; align-items: center; justify-content: center;
  margin-bottom: 1.5rem;
}
h1   { font-size: 32px; font-weight: 700; margin-bottom: 8px; }
.sub { color: rgba(255,255,255,0.4); margin-bottom: 2rem; }
.topics {
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 12px; max-width: 400px; margin: 0 auto;
}
.topic-card {
  display: flex; flex-direction: column; align-items: center; gap: 8px;
  padding: 20px 16px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 14px; color: #f0eff4;
  cursor: pointer; font-size: 14px; font-weight: 500;
  transition: background 0.15s, border-color 0.15s, transform 0.1s;
}
.topic-card:hover {
  background: rgba(66,211,146,0.1);
  border-color: rgba(66,211,146,0.4);
  transform: translateY(-2px);
}
.topic-emoji { font-size: 28px; }
</style>