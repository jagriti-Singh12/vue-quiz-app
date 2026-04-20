<template>
  <div class="results" v-if="quiz.questions.length > 0">
    <div class="circle">
      <svg viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          :r="radius"
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          stroke-width="8"
        />

        <circle
          cx="50"
          cy="50"
          :r="radius"
          fill="none"
          stroke="#a78bfa"
          stroke-width="8"
          :stroke-linecap="quiz.scorePercent === 100 ? 'butt' : 'round'"
          :stroke-dasharray="circumference"
          :stroke-dashoffset="dashOffset"
          style="transition: stroke-dashoffset 1s ease"
        />
      </svg>

      <div class="circle-text">
        <span class="pct">{{ quiz.scorePercent }}%</span>
        <span class="fraction">
          {{ quiz.score }}/{{ quiz.questions.length }}
        </span>
      </div>
    </div>

    <h2>{{ verdict }}</h2>
    <p class="sub">
      {{ quiz.score }} correct out of {{ quiz.questions.length }} questions
    </p>

    <div class="actions">
      <button class="play-btn" @click="playAgain">Play again</button>
      <button class="home-btn" @click="goHome">Home</button>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useQuizStore } from "@/stores/useQuizStore";

const quiz = useQuizStore();
const router = useRouter();

const radius = 44;
const circumference = 2 * Math.PI * radius;

const dashOffset = computed(() => {
  const percent = quiz.scorePercent || 0;

  if (percent === 100) return 0;

  return circumference * (1 - percent / 100);
});

const verdict = computed(() => {
  const p = quiz.scorePercent;
  if (p === 100) return "🎯 Perfect score!";
  if (p >= 80) return "🔥 Excellent!";
  if (p >= 60) return "👍 Good job!";
  if (p >= 40) return "📚 Keep studying!";
  return "💪 Keep practising!";
});

function playAgain() {
  const topic = quiz.currentTopic;
  quiz.resetQuiz();
  quiz.loadTopic(topic);
  router.push("/quiz");
}

function goHome() {
  quiz.resetQuiz();
  router.push("/");
}
</script>

<style scoped>
.results {
  text-align: center;
  padding-top: 2rem;
}

.circle {
  position: relative;
  width: 180px;
  height: 180px;
  margin: 0 auto 2rem;
}

.circle svg {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.circle-text {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.pct {
  font-size: 36px;
  font-weight: 700;
}

.fraction {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.4);
}

h2 {
  font-size: 26px;
  font-weight: 700;
  margin-bottom: 8px;
}

.sub {
  color: rgba(255, 255, 255, 0.4);
  margin-bottom: 2rem;
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 280px;
  margin: 0 auto;
}

.play-btn {
  padding: 14px;
  background: #a78bfa;
  color: #1e0062;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.15s;
}

.play-btn:hover {
  background: #c4b5fd;
}

.home-btn {
  padding: 14px;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  color: rgba(255, 255, 255, 0.5);
  font-size: 15px;
  cursor: pointer;
  transition:
    border-color 0.15s,
    color 0.15s;
}

.home-btn:hover {
  border-color: rgba(255, 255, 255, 0.35);
  color: #f0eff4;
}
</style>
