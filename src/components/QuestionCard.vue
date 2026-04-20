<template>
  <div class="card">
    <div class="meta">
      <span class="category">{{ question.category }}</span>
      <span class="diff" :class="question.difficulty">{{
        question.difficulty
      }}</span>
    </div>
    <p class="question-text">{{ question.question }}</p>
    <pre
      v-if="question.code"
      class="code-block"
    ><code>{{ question.code }}</code></pre>
    <div class="options">
      <AnswerOption
        v-for="(answer, i) in question.answers"
        :key="answer"
        :answer="answer"
        :letter="letters[i]"
        :state="getState(answer)"
        :disabled="hasAnswered"
        @select="$emit('answer', answer)"
      />
    </div>

    <Transition name="fade">
      <div v-if="hasAnswered" class="explanation">
        <p class="exp-label">Explanation</p>
        <p class="exp-text">{{ question.explanation }}</p>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import AnswerOption from "./AnswerOption.vue";

const props = defineProps({
  question: Object,
  selectedAnswer: String,
  hasAnswered: Boolean,
});
defineEmits(["answer"]);

const letters = ["A", "B", "C", "D"];

function getState(answer) {
  if (!props.hasAnswered) return "";
  if (answer === props.question.correctAnswer) return "correct";
  if (answer === props.selectedAnswer) return "wrong";
  return "dimmed";
}
</script>

<style scoped>
.card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  padding: 28px;
  margin-bottom: 1.5rem;
}
.meta {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 18px;
}
.category {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.35);
}
.diff {
  font-size: 11px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 999px;
  text-transform: capitalize;
}
.diff.easy {
  background: rgba(52, 211, 153, 0.15);
  color: #6ee7b7;
}
.diff.medium {
  background: rgba(251, 191, 36, 0.15);
  color: #fcd34d;
}
.diff.hard {
  background: rgba(248, 113, 113, 0.15);
  color: #fca5a5;
}
.question-text {
  font-size: 20px;
  font-weight: 500;
  line-height: 1.5;
  margin-bottom: 24px;
  color: #f0eff4;
}

.code-block {
  background: rgba(0, 0, 0, 0.35);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  padding: 14px 16px;
  margin-bottom: 20px;
  overflow-x: auto;
  font-family: "Fira Code", "Cascadia Code", monospace;
  font-size: 13px;
  line-height: 1.7;
  color: #a78bfa;
  white-space: pre;
  word-break: normal;
  text-align: left;
}

.options {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.explanation {
  margin-top: 20px;
  padding: 14px 16px;
  background: rgba(66, 211, 146, 0.08);
  border: 1px solid rgba(66, 211, 146, 0.2);
  border-radius: 10px;
}
.exp-label {
  font-size: 11px;
  font-weight: 600;
  color: #42d392;
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.exp-text {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
