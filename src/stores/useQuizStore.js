import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { questions as allQuestions } from '@/data/question';

export const STATUS = {
  IDLE: 'idle', ACTIVE: 'active', FINISHED: 'finished',
}

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export const useQuizStore = defineStore('quiz', () => {
  const status         = ref(STATUS.IDLE)
  const questions      = ref([])
  const currentIndex   = ref(0)
  const score          = ref(0)
  const selectedAnswer = ref(null)
  const currentTopic   = ref('')

  const currentQuestion = computed(() => questions.value[currentIndex.value] ?? null)
  const progress        = computed(() => Math.round((currentIndex.value / questions.value.length) * 100))
  const hasAnswered     = computed(() => selectedAnswer.value !== null)
  const questionLabel   = computed(() => `${currentIndex.value + 1} / ${questions.value.length}`)
  const scorePercent    = computed(() => Math.round((score.value / questions.value.length) * 100))
  const isCorrect       = computed(() =>
    selectedAnswer.value === currentQuestion.value?.correctAnswer
  )

  // No API — just filter local questions by topic
  function loadTopic(topicId) {
    const filtered = allQuestions.filter(q => q.topic === topicId)
    questions.value      = shuffle(filtered).slice(0, 10)
    currentIndex.value   = 0
    score.value          = 0
    selectedAnswer.value = null
    currentTopic.value   = topicId
    status.value         = STATUS.ACTIVE
  }

  function answerQuestion(answer) {
    if (status.value !== STATUS.ACTIVE || hasAnswered.value) return
    selectedAnswer.value = answer
    if (answer === currentQuestion.value.correctAnswer) score.value++
  }

  function nextQuestion() {
    if (status.value !== STATUS.ACTIVE || !hasAnswered.value) return
    if (currentIndex.value === questions.value.length - 1) {
      status.value = STATUS.FINISHED
    } else {
      currentIndex.value++
      selectedAnswer.value = null
    }
  }

  function resetQuiz() {
    status.value         = STATUS.IDLE
    questions.value      = []
    currentIndex.value   = 0
    score.value          = 0
    selectedAnswer.value = null
    currentTopic.value   = ''
  }

  return {
    status, questions, currentIndex, score, selectedAnswer, currentTopic,
    currentQuestion, progress, hasAnswered, questionLabel, scorePercent, isCorrect,
    loadTopic, answerQuestion, nextQuestion, resetQuiz, STATUS,
  }
})