# Vue 3 Quiz App

An interactive quiz app to learn and test Vue 3 concepts — built entirely with Vue 3 itself.

## Features

- 6 topics — Reactivity, Components, Composables, Vue Router, Pinia, Performance
- 10 questions per topic with code snippets and explanations
- 30-second countdown timer per question
- Score tracking with animated results circle
- Smooth slide transitions between questions
- Route-based lazy loading for optimal performance
- Fully offline — no API key required

## Tech Stack

| Tool                  | Purpose                                                   |
| --------------------- | --------------------------------------------------------- |
| Vue 3 + Vite          | Framework and build tool                                  |
| Pinia                 | Global state machine (idle → loading → active → finished) |
| Vue Router 4          | Client-side routing with lazy-loaded routes               |
| Composition API       | `<script setup>` throughout                               |
| `useTimer` composable | Encapsulated countdown with auto-cleanup                  |
| Vue `<Transition>`    | Question slide animations — no animation library          |
| Open Trivia DB        | Free trivia API (no key needed)                           |

## Concepts Demonstrated

- **Pinia state machine** — quiz status modelled as `idle → active → finished` with action guards
- **Composables** — `useTimer()` encapsulates `setInterval` + `onUnmounted` cleanup
- **Lazy loading** — every route uses `() => import()` for code splitting
- **Reactive navigation** — `watch(quiz.status)` drives routing, not button clicks
- **Vue Transition** — built-in `<Transition>` for page and question animations

## Project Setup

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
src/
├── composables/
│   └── useTimer.js        # Countdown timer with auto-cleanup
├── data/
│   └── questions.js       # 60 questions across 6 Vue topics
├── router/
│   └── index.js           # Lazy-loaded routes
├── stores/
│   └── useQuizStore.js    # Pinia state machine
├── views/
│   ├── HomeView.vue       # Topic selector
│   ├── QuizView.vue       # Quiz screen with timer
│   └── ResultsView.vue    # Score summary
└── components/
    ├── QuestionCard.vue   # Question + answer options
    ├── AnswerOption.vue   # Individual answer button
    └── TimerBar.vue       # Shrinking progress bar
```
