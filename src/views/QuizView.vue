<template>
  <div class="quiz">
    <TimerBar :seconds="seconds" :total="TOTAL" />

    <div class="header">
      <span class="label">{{ quiz.questionLabel }}</span>
      <span class="timer" :class="{ urgent: seconds <= 10 }">{{ seconds }}s</span>
      <span class="score">{{ quiz.score }} pts</span>
    </div>

    <Transition name="question" mode="out-in">
      <QuestionCard
        v-if="quiz.currentQuestion"
        :key="quiz.currentIndex"
        :question="quiz.currentQuestion"
        :selected-answer="quiz.selectedAnswer"
        :has-answered="quiz.hasAnswered"
        @answer="handleAnswer"
      />
    </Transition>

    <Transition name="fade">
      <button v-if="quiz.hasAnswered" class="next-btn" @click="handleNext">
        {{ isLast ? 'See results →' : 'Next question →' }}
      </button>
    </Transition>
  </div>
</template>

<script setup>
import { computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useQuizStore, STATUS } from '@/stores/useQuizStore';
import { useTimer } from '@/composables/useTimer';
import TimeBar from '@/components/TimeBar.vue';
import QuestionCard from '@/components/QuestionCard.vue';

const quiz   = useQuizStore()
const router = useRouter()
const TOTAL  = 30

const { seconds, start, pause, reset } = useTimer(TOTAL, () => {
  quiz.answerQuestion('__TIME_UP__')
})

const isLast = computed(() => quiz.currentIndex === quiz.questions.length - 1)

function handleAnswer(answer) {
  pause()
  quiz.answerQuestion(answer)
}

function handleNext() {
  quiz.nextQuestion()
  if (quiz.status === STATUS.FINISHED) {
    router.push('/results')
    return
  }
  reset(TOTAL)
  start()
}

watch(() => quiz.status, s => {
  if (s === STATUS.IDLE)     router.push('/')
  if (s === STATUS.FINISHED) router.push('/results')
}, { immediate: true })

start()
</script>

<style scoped>
.header {
  display: flex; justify-content: space-between;
  align-items: center; margin-bottom: 1.5rem;
  font-size: 13px; color: rgba(255,255,255,0.4);
}
.timer        { font-weight: 600; color: #a78bfa; }
.timer.urgent { color: #f87171; }
.score        { font-weight: 600; color: rgba(255,255,255,0.6); }

.next-btn {
  width: 100%; padding: 16px;
  background: #a78bfa; color: #1e0062;
  border: none; border-radius: 12px;
  font-size: 16px; font-weight: 700; cursor: pointer;
  transition: background 0.15s, transform 0.1s;
}
.next-btn:hover  { background: #c4b5fd; }
.next-btn:active { transform: scale(0.98); }

.question-enter-active,
.question-leave-active { transition: opacity 0.2s ease, transform 0.2s ease; }
.question-enter-from   { opacity: 0; transform: translateX(24px); }
.question-leave-to     { opacity: 0; transform: translateX(-24px); }

.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to       { opacity: 0; }
</style>