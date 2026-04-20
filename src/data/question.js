export const topics = [
  { id: "reactivity", label: "Reactivity", emoji: "⚡" },
  { id: "components", label: "Components", emoji: "🧩" },
  { id: "composables", label: "Composables", emoji: "🪝" },
  { id: "router", label: "Vue Router", emoji: "🗺️" },
  { id: "pinia", label: "Pinia", emoji: "🍍" },
  { id: "performance", label: "Performance", emoji: "🚀" },
];

export const questions = [
  // ─────────────────────────────────────────
  // REACTIVITY (10)
  // ─────────────────────────────────────────
  {
    topic: "reactivity",
    difficulty: "easy",
    question: "What does ref() return in Vue 3?",
    code: `import { ref } from 'vue'
const count = ref(0)
console.log(count)`,
    answers: [
      "A reactive object with a .value property",
      "The raw value directly",
      "A computed property",
      "A readonly copy of the value",
    ],
    correctAnswer: "A reactive object with a .value property",
    explanation:
      "ref() wraps a value in a reactive object. You must use .value to read or write it in JavaScript, but in templates Vue unwraps it automatically so you write {{ count }} instead of {{ count.value }}.",
  },
  {
    topic: "reactivity",
    difficulty: "easy",
    question: "When should you use reactive() instead of ref()?",
    answers: [
      "When managing a group of related values as one object",
      "When the value is a primitive like a number or string",
      "When you need a readonly value",
      "reactive() and ref() are identical",
    ],
    correctAnswer: "When managing a group of related values as one object",
    explanation:
      "reactive() is designed for objects — it makes every nested property reactive. ref() is better for primitives. A common pattern: use ref() for single values and reactive() for form state or complex grouped objects.",
  },
  {
    topic: "reactivity",
    difficulty: "medium",
    question: "What is the output of this code?",
    code: `const count = ref(0)
const double = computed(() => count.value * 2)
count.value = 5
console.log(double.value)`,
    answers: ["10", "0", "5", "undefined"],
    correctAnswer: "10",
    explanation:
      "computed() creates a reactive derived value that re-evaluates when its dependencies change. Since count becomes 5, double.value = 5 × 2 = 10. Computed values are also lazy and cached — they only recalculate when a dependency actually changes.",
  },
  {
    topic: "reactivity",
    difficulty: "medium",
    question:
      "Which watcher option makes the callback run immediately on creation?",
    code: `watch(source, callback, { ??? })`,
    answers: ["immediate: true", "eager: true", "instant: true", "flush: true"],
    correctAnswer: "immediate: true",
    explanation:
      "By default, watch() is lazy — it only fires when the source changes. Adding { immediate: true } runs the callback once right away with the current value. This is useful for fetching data based on a reactive prop when the component first mounts.",
  },
  {
    topic: "reactivity",
    difficulty: "medium",
    question: "What happens when you reassign a reactive() object entirely?",
    code: `let state = reactive({ count: 0 })
state = reactive({ count: 99 }) // reassigned
console.log(state.count)`,
    answers: [
      "Reactivity is lost — the template will not update",
      "99 — reactive tracks the new object automatically",
      "Vue throws an error",
      "0 — reactive keeps the original object",
    ],
    correctAnswer: "Reactivity is lost — the template will not update",
    explanation:
      "reactive() tracks the original object reference. If you replace the variable entirely, Vue loses the reactive connection. This is why ref() is often safer for top-level state — reassigning ref.value works fine because the ref wrapper stays the same.",
  },
  {
    topic: "reactivity",
    difficulty: "medium",
    question: "What does watchEffect() do differently from watch()?",
    answers: [
      "It auto-tracks dependencies and runs immediately",
      "It only watches a single ref",
      "It runs after the DOM updates",
      "It requires an explicit source array",
    ],
    correctAnswer: "It auto-tracks dependencies and runs immediately",
    explanation:
      "watchEffect() runs immediately and automatically tracks every reactive value accessed inside it. watch() is explicit (you declare the source) and lazy (runs only on change). Use watchEffect when a side effect depends on multiple reactive values you want tracked automatically.",
  },
  {
    topic: "reactivity",
    difficulty: "hard",
    question: "What is the difference between toRef() and toRefs()?",
    code: `const state = reactive({ name: 'Vue', version: 3 })
const { name } = toRefs(state)`,
    answers: [
      "toRef() creates a ref for one property; toRefs() converts all properties",
      "toRef() is for primitives; toRefs() is for objects",
      "toRefs() creates a readonly copy; toRef() creates a writable one",
      "They are identical — toRef is just an alias",
    ],
    correctAnswer:
      "toRef() creates a ref for one property; toRefs() converts all properties",
    explanation:
      'toRef(state, "name") creates a single ref linked to state.name. toRefs(state) converts every property into a ref, allowing safe destructuring of reactive objects without losing reactivity. Changes to either side stay in sync.',
  },
  {
    topic: "reactivity",
    difficulty: "hard",
    question: "What does readonly() do in Vue 3?",
    code: `const state = reactive({ count: 0 })
const readState = readonly(state)
readState.count = 5 // what happens?`,
    answers: [
      "Vue warns and the mutation is blocked",
      "The mutation succeeds silently",
      "Vue throws a runtime error and crashes",
      "readState becomes a new independent copy",
    ],
    correctAnswer: "Vue warns and the mutation is blocked",
    explanation:
      'readonly() creates a reactive but immutable proxy. Any attempt to mutate it logs a Vue warning in development and the change is blocked. It is commonly used to expose store state to components without allowing direct mutation — enforcing the "mutate via actions only" pattern.',
  },
  {
    topic: "reactivity",
    difficulty: "hard",
    question: 'What does the flush: "post" option do in watch()?',
    code: `watch(source, callback, { flush: 'post' })`,
    answers: [
      "Runs the callback after Vue has updated the DOM",
      "Debounces the callback to run after all watchers finish",
      "Delays the callback by one event loop tick",
      "Runs the callback before the component re-renders",
    ],
    correctAnswer: "Runs the callback after Vue has updated the DOM",
    explanation:
      'By default, watch callbacks run before the DOM is updated. { flush: "post" } delays the callback until after Vue has flushed its DOM updates — useful when you need to access the updated DOM (like measuring element dimensions) inside the watcher callback. nextTick() does the same thing manually.',
  },
  {
    topic: "reactivity",
    difficulty: "hard",
    question: "What is the purpose of markRaw() in Vue 3?",
    code: `import { markRaw, reactive } from 'vue'
const obj = markRaw({ heavyLib: {} })
const state = reactive({ tool: obj })`,
    answers: [
      "Marks an object so Vue never makes it reactive",
      "Marks a ref as immutable for the current render",
      "Prevents an object from being garbage collected",
      "Converts a reactive object back to a plain object",
    ],
    correctAnswer: "Marks an object so Vue never makes it reactive",
    explanation:
      "markRaw() tells Vue to skip reactivity conversion for that object, even when nested inside reactive state. This is useful for third-party class instances, large datasets, or objects that change frequently where the reactivity overhead is not worth paying.",
  },

  // ─────────────────────────────────────────
  // COMPONENTS (10)
  // ─────────────────────────────────────────
  {
    topic: "components",
    difficulty: "easy",
    question: "How do you declare a prop in <script setup>?",
    code: `<script setup>
// Declare a 'title' string prop
</script>`,
    answers: [
      "const props = defineProps({ title: String })",
      'const props = useProp("title")',
      "export default { props: ['title'] }",
      'const { title } = inject("props")',
    ],
    correctAnswer: "const props = defineProps({ title: String })",
    explanation:
      'defineProps() is a compiler macro available only inside <script setup>. No import is needed — Vue exposes it globally in the setup context. You can use the shorthand array form defineProps(["title"]) or the object form for type validation.',
  },
  {
    topic: "components",
    difficulty: "easy",
    question: "What directive creates two-way data binding on a form input?",
    answers: ["v-model", "v-bind", "v-sync", "v-link"],
    correctAnswer: "v-model",
    explanation:
      'v-model is shorthand for :value="x" @input="x = $event.target.value". On custom components it compiles to :modelValue="x" @update:modelValue="x = $event", which is why child components declare defineProps({ modelValue }) and emit("update:modelValue", newVal).',
  },
  {
    topic: "components",
    difficulty: "easy",
    question: 'What does the "key" attribute do in a v-for loop?',
    code: `<li v-for="item in list" :key="item.id">
  {{ item.name }}
</li>`,
    answers: [
      "Helps Vue identify which items changed for efficient re-rendering",
      "Sets a CSS identifier on each element",
      "Makes each list item uniquely selectable",
      "Prevents duplicate values in the list",
    ],
    correctAnswer:
      "Helps Vue identify which items changed for efficient re-rendering",
    explanation:
      "Without :key, Vue reuses DOM elements in-place when the list changes, which can cause rendering bugs especially with stateful components or transitions. With a stable unique key (like an ID), Vue correctly moves, creates, or destroys elements matching the new order.",
  },
  {
    topic: "components",
    difficulty: "easy",
    question: "What is the difference between v-show and v-if?",
    answers: [
      "v-show toggles CSS display; v-if adds/removes the element from the DOM",
      "v-show is for components; v-if is for HTML elements only",
      "v-if is faster for elements that toggle frequently",
      "They are identical in behaviour and performance",
    ],
    correctAnswer:
      "v-show toggles CSS display; v-if adds/removes the element from the DOM",
    explanation:
      "v-if has a higher toggle cost because it creates/destroys the element and runs lifecycle hooks each time. v-show has a higher initial render cost because the element always renders. Rule of thumb: use v-show for things that toggle often, v-if for things that rarely change.",
  },
  {
    topic: "components",
    difficulty: "medium",
    question: "How does a child component send data back to its parent?",
    code: `<script setup>
const emit = defineEmits(['submit'])
function handleClick() {
  // send 'submit' with payload
}
</script>`,
    answers: [
      "emit('submit', payload)",
      "this.$emit('submit', payload)",
      "dispatch('submit', payload)",
      "props.onSubmit(payload)",
    ],
    correctAnswer: "emit('submit', payload)",
    explanation:
      "In <script setup>, defineEmits() returns an emit function you call directly. The parent listens with @submit='handler'. Note: this.$emit doesn't work in <script setup> because there is no component instance 'this' in the Composition API.",
  },
  {
    topic: "components",
    difficulty: "medium",
    question: "What is a slot used for in Vue 3?",
    answers: [
      "Passing template content from a parent into a child component",
      "Sharing reactive state between sibling components",
      "Declaring async lifecycle hooks",
      "Creating a named ref to a DOM element",
    ],
    correctAnswer:
      "Passing template content from a parent into a child component",
    explanation:
      'Slots let parent components inject arbitrary HTML into specific places in a child. <slot/> is the default outlet. Named slots (<slot name="header"/>) allow multiple injection points. Scoped slots pass data from the child back up to the parent template for rendering.',
  },
  {
    topic: "components",
    difficulty: "medium",
    question: "What does defineExpose() do in <script setup>?",
    code: `<script setup>
const count = ref(0)
defineExpose({ count })
</script>`,
    answers: [
      "Makes selected internals accessible via template refs from the parent",
      "Exports the component for use in other files",
      "Exposes props to the global Vue instance",
      "Registers the component globally without app.component()",
    ],
    correctAnswer:
      "Makes selected internals accessible via template refs from the parent",
    explanation:
      "By default, <script setup> components are closed — a parent using a template ref cannot access anything inside them. defineExpose() opts specific values in. The parent accesses them via childRef.value.count. This is useful for triggering methods on child components like focus() or reset().",
  },
  {
    topic: "components",
    difficulty: "medium",
    question: "How do you access a child component's DOM element or instance?",
    code: `<template>
  <input ref="inputEl" />
</template>`,
    answers: [
      "const inputEl = ref(null) — then inputEl.value after mount",
      "const inputEl = reactive(null) — Vue fills it automatically",
      'document.querySelector("input") in onMounted',
      "Using defineExpose() on the input element",
    ],
    correctAnswer: "const inputEl = ref(null) — then inputEl.value after mount",
    explanation:
      "Template refs let you directly access DOM elements or child component instances. Declare const inputEl = ref(null) in <script setup> with the same name as the ref attribute. Vue populates inputEl.value after the component mounts. Always access it inside onMounted or a watcher.",
  },
  {
    topic: "components",
    difficulty: "hard",
    question: "What is provide() and inject() used for?",
    answers: [
      "Passing data deeply through the component tree without prop drilling",
      "Providing a Pinia store to child components",
      "Injecting external CSS into a component",
      "Sharing methods between composables",
    ],
    correctAnswer:
      "Passing data deeply through the component tree without prop drilling",
    explanation:
      'provide() in an ancestor component makes a value available to all descendants, no matter how deep. inject() in any descendant retrieves it. This avoids "prop drilling" — passing props through every intermediate component that doesn\'t use them. Vue Router and Pinia both use this mechanism internally.',
  },
  {
    topic: "components",
    difficulty: "hard",
    question: "What does the <Teleport> component do?",
    code: `<Teleport to="body">
  <div class="modal">...</div>
</Teleport>`,
    answers: [
      "Renders its content in a different DOM location outside the component tree",
      "Lazily loads the component only when it enters the viewport",
      "Teleports props from parent to child without declaration",
      "Creates a portal to another Vue application instance",
    ],
    correctAnswer:
      "Renders its content in a different DOM location outside the component tree",
    explanation:
      "<Teleport> moves its slot content to a different DOM node (like document.body) while keeping it logically inside the Vue component tree. This solves CSS stacking context problems for modals, tooltips, and dropdowns — they render at the body level so z-index and overflow work correctly.",
  },

  // ─────────────────────────────────────────
  // COMPOSABLES (10)
  // ─────────────────────────────────────────
  {
    topic: "composables",
    difficulty: "easy",
    question: "What naming convention do Vue 3 composables follow?",
    answers: [
      'They start with "use" — e.g. useTimer, useFetch',
      'They start with "get" — e.g. getTimer, getData',
      'They end with "Store" — e.g. TimerStore',
      "No convention — any name works",
    ],
    correctAnswer: 'They start with "use" — e.g. useTimer, useFetch',
    explanation:
      'The "use" prefix signals that the function uses Vue\'s Composition API internally (refs, lifecycle hooks, etc.) and must be called at the top level of setup(). This convention comes from React hooks and is now standard across the Vue ecosystem.',
  },
  {
    topic: "composables",
    difficulty: "easy",
    question: "What is the main advantage of a composable over a mixin?",
    answers: [
      "Clear source of returned values — no naming conflicts or implicit dependencies",
      "Composables run faster than mixins at runtime",
      "Mixins cannot use reactive state but composables can",
      "Composables work in Vue 2 but mixins do not",
    ],
    correctAnswer:
      "Clear source of returned values — no naming conflicts or implicit dependencies",
    explanation:
      "Mixins merge their properties into the component, making it unclear where each property comes from, and causing naming collisions when multiple mixins are used. Composables are just functions that return values explicitly — you always know exactly where data came from.",
  },
  {
    topic: "composables",
    difficulty: "easy",
    question: "Which of these is a valid composable?",
    code: `// Option A
function useCount() {
  const n = ref(0)
  return { n }
}

// Option B
const useCount = { count: ref(0) }`,
    answers: [
      "Option A — composables are functions that return reactive state",
      "Option B — composables are plain objects with reactive properties",
      "Both are valid composables",
      "Neither — composables must use defineComposable()",
    ],
    correctAnswer:
      "Option A — composables are functions that return reactive state",
    explanation:
      "A composable is always a function. The function body is where you call ref(), computed(), onMounted() etc. Each call to useCount() creates its own independent reactive state. Option B is just a plain reactive object — it shares state across all users of it.",
  },
  {
    topic: "composables",
    difficulty: "medium",
    question: "Why must composables be called at the top level of setup()?",
    answers: [
      "So Vue can associate lifecycle hooks with the correct component instance",
      "For performance — nested calls create extra overhead",
      "Because defineProps() only works at the top level",
      "It is just a style convention with no technical requirement",
    ],
    correctAnswer:
      "So Vue can associate lifecycle hooks with the correct component instance",
    explanation:
      "Vue tracks which component is currently initialising. When onMounted() or onUnmounted() is called inside a composable, Vue registers the hook against that component. If the composable is called inside an if-block or setTimeout, the component context may not be active and the hook won't register.",
  },
  {
    topic: "composables",
    difficulty: "medium",
    question: "What does onUnmounted() inside a composable protect against?",
    code: `export function useTimer() {
  const id = setInterval(tick, 1000)
  onUnmounted(() => clearInterval(id))
}`,
    answers: [
      "Memory leaks from intervals or listeners that outlive the component",
      "Props changing after the component is destroyed",
      "Duplicate composable instances being created",
      "Reactive state being garbage collected too early",
    ],
    correctAnswer:
      "Memory leaks from intervals or listeners that outlive the component",
    explanation:
      "Without onUnmounted cleanup, setInterval keeps firing even after the component is gone. The callback may try to update refs that no longer exist. By cleaning up inside the composable, every component that calls useTimer() gets automatic leak prevention for free — no manual cleanup needed.",
  },
  {
    topic: "composables",
    difficulty: "medium",
    question:
      "How can a composable accept a reactive argument that updates automatically?",
    code: `// Parent passes a ref:
const url = ref('/api/users')
useFetch(url) // should re-fetch when url changes`,
    answers: [
      "Accept a ref or getter and use watchEffect inside the composable",
      "Use props instead of arguments for reactive composables",
      "Composables cannot react to changing arguments",
      "Call the composable again inside a watch() in the parent",
    ],
    correctAnswer:
      "Accept a ref or getter and use watchEffect inside the composable",
    explanation:
      "If you pass a raw value (not a ref), the composable gets a snapshot and cannot react to changes. Pass a ref or a getter (() => props.url) and use watchEffect or watch inside the composable to re-run logic whenever the argument changes. This pattern is used by VueUse throughout its library.",
  },
  {
    topic: "composables",
    difficulty: "medium",
    question: "What does this composable pattern achieve?",
    code: `export function useDark() {
  const isDark = ref(
    window.matchMedia('(prefers-color-scheme: dark)').matches
  )
  return { isDark }
}`,
    answers: [
      "Reads the user's OS dark mode preference reactively",
      "Toggles a CSS class on the document body",
      "Syncs dark mode preference to localStorage",
      "Creates a global dark mode store",
    ],
    correctAnswer: "Reads the user's OS dark mode preference reactively",
    explanation:
      "This composable encapsulates browser API access inside a reactive wrapper. Components get a clean isDark ref without knowing about matchMedia. A production version would also add an event listener for changes and clean it up with onUnmounted — exactly the kind of encapsulation composables excel at.",
  },
  {
    topic: "composables",
    difficulty: "hard",
    question:
      "What is the difference between a composable and a Pinia store for shared state?",
    answers: [
      "Composables create new state per call; Pinia stores are global singletons",
      "Pinia stores use ref(); composables use reactive()",
      "Composables persist between page navigations; Pinia does not",
      "They are interchangeable — choose based on personal preference",
    ],
    correctAnswer:
      "Composables create new state per call; Pinia stores are global singletons",
    explanation:
      "Every call to useTimer() creates its own independent seconds and isRunning refs. Pinia's defineStore() creates a singleton — every call to useQuizStore() returns the exact same reactive state. Use composables for per-component logic; use Pinia when multiple unrelated components must share and synchronise the same state.",
  },
  {
    topic: "composables",
    difficulty: "hard",
    question: "What problem does this pattern solve?",
    code: `export function useEventListener(target, event, handler) {
  onMounted(() => target.addEventListener(event, handler))
  onUnmounted(() => target.removeEventListener(event, handler))
}`,
    answers: [
      "Automatically adds and removes event listeners tied to a component's lifetime",
      "Prevents event bubbling between Vue components",
      "Creates a reactive event stream from DOM events",
      "Replaces Vue directives for handling custom events",
    ],
    correctAnswer:
      "Automatically adds and removes event listeners tied to a component's lifetime",
    explanation:
      "Adding event listeners in onMounted without removing them in onUnmounted is one of the most common memory leaks in Vue apps. This composable pairs the add and remove inside one function so they can never get out of sync. Any component can now add a window resize listener in one line with guaranteed cleanup.",
  },
  {
    topic: "composables",
    difficulty: "hard",
    question:
      "When should you return refs from a composable instead of raw values?",
    answers: [
      "Always — returning raw values breaks reactivity in the template",
      "Only when the value is an object, not a primitive",
      "Only when using TypeScript — raw values work fine in JavaScript",
      "Never — composables should return reactive() objects only",
    ],
    correctAnswer:
      "Always — returning raw values breaks reactivity in the template",
    explanation:
      "If you return count.value instead of count from a composable, the component receives a plain number snapshot. The template displays it once and never updates. Always return the ref itself so the template maintains a live reactive connection. The template auto-unwraps refs so {{ count }} still works without .value.",
  },

  // ─────────────────────────────────────────
  // VUE ROUTER (10)
  // ─────────────────────────────────────────
  {
    topic: "router",
    difficulty: "easy",
    question: "What is route-based lazy loading and how do you write it?",
    code: `// Which syntax enables lazy loading?`,
    answers: [
      "component: () => import('./views/HomeView.vue')",
      "component: import('./views/HomeView.vue')",
      "component: lazy('./views/HomeView.vue')",
      "component: require('./views/HomeView.vue')",
    ],
    correctAnswer: "component: () => import('./views/HomeView.vue')",
    explanation:
      "The arrow function wrapping import() is critical. Without it, import() executes immediately at startup and all views load together. With it, Vite only fetches that chunk when the route is first visited. Each lazy route becomes a separate JS file in the build output, reducing initial load time.",
  },
  {
    topic: "router",
    difficulty: "easy",
    question:
      "What is the difference between <RouterLink> and a regular <a> tag?",
    answers: [
      "<RouterLink> navigates without a full page reload; <a> causes a full reload",
      "<RouterLink> only works with named routes",
      "<a> tags are faster because they bypass Vue Router",
      "They are identical in a Vue SPA",
    ],
    correctAnswer:
      "<RouterLink> navigates without a full page reload; <a> causes a full reload",
    explanation:
      '<RouterLink> intercepts the click and uses the History API to change the URL and render the new component — no network request, no page refresh. A plain <a href="/quiz"> causes a full browser navigation which reloads the entire app and resets all state.',
  },
  {
    topic: "router",
    difficulty: "easy",
    question: "How do you navigate programmatically in Vue Router 4?",
    code: `import { useRouter } from 'vue-router'
const router = useRouter()
// Navigate to /quiz`,
    answers: [
      "router.push('/quiz')",
      "router.navigate('/quiz')",
      "router.go('/quiz')",
      "this.$router.push('/quiz')",
    ],
    correctAnswer: "router.push('/quiz')",
    explanation:
      "router.push() adds a new entry to the browser history stack so the back button works. router.replace() navigates without adding a history entry. this.$router doesn't work in <script setup> because there is no component instance — always use the useRouter() composable instead.",
  },
  {
    topic: "router",
    difficulty: "medium",
    question:
      "What is the difference between createWebHistory() and createWebHashHistory()?",
    answers: [
      "createWebHistory() uses clean /path URLs; createWebHashHistory() adds # to URLs",
      "createWebHistory() is for SPAs; createWebHashHistory() is for SSR apps",
      "createWebHashHistory() is faster at runtime",
      "They are identical — just different names for the same function",
    ],
    correctAnswer:
      "createWebHistory() uses clean /path URLs; createWebHashHistory() adds # to URLs",
    explanation:
      "createWebHistory() gives /about style URLs but requires the server to redirect all paths to index.html — otherwise refreshing /about returns a 404. createWebHashHistory() gives /#/about — the server only serves /, the JS handles everything after #. Vite's dev server handles createWebHistory() automatically.",
  },
  {
    topic: "router",
    difficulty: "medium",
    question: "How do you access URL params like /quiz/:id in a component?",
    code: `// Route: { path: '/quiz/:id' }
// Inside component:`,
    answers: [
      "const route = useRoute(); route.params.id",
      "const router = useRouter(); router.params.id",
      "defineProps(['id']) — Vue Router injects params as props",
      "this.$params.id",
    ],
    correctAnswer: "const route = useRoute(); route.params.id",
    explanation:
      "useRoute() returns the current route object with params, query, name, path, and more. useRouter() returns the router instance for navigation methods. They are different — useRoute() reads the current location, useRouter() changes it. You can also enable props: true in the route config to receive params as component props.",
  },
  {
    topic: "router",
    difficulty: "medium",
    question: "What are navigation guards used for?",
    answers: [
      "Running logic before or after a route change — like auth checks",
      "Preventing components from unmounting during transitions",
      "Validating route params before the component renders",
      "All of the above",
    ],
    correctAnswer: "All of the above",
    explanation:
      "Navigation guards are hooks that run before (beforeEach), after (afterEach), or within a route change. They are used for authentication (redirect to login if not authenticated), analytics (log page views), data fetching (load data before rendering), and cancelling navigation if params are invalid.",
  },
  {
    topic: "router",
    difficulty: "medium",
    question:
      "What does the { immediate: true } equivalent look like for route watchers?",
    code: `const route = useRoute()
watch(() => route.params.id, fetchData, { ??? })`,
    answers: [
      "{ immediate: true } — runs fetchData on mount and on every id change",
      "{ lazy: false } — makes the watcher run upfront",
      "{ deep: true } — watches nested route properties",
      "No option needed — route watchers always run immediately",
    ],
    correctAnswer:
      "{ immediate: true } — runs fetchData on mount and on every id change",
    explanation:
      "When watching route params to fetch data, you want to load on mount AND on every subsequent change. { immediate: true } handles both cases in one watcher. Without it, the first render has no data because the watcher only fires on changes, not on initial setup.",
  },
  {
    topic: "router",
    difficulty: "hard",
    question: "What is a nested route and when would you use one?",
    code: `{
  path: '/settings',
  component: SettingsLayout,
  children: [
    { path: 'profile', component: ProfileView },
    { path: 'account', component: AccountView },
  ]
}`,
    answers: [
      "A route rendered inside another route's <RouterView> — for shared layouts",
      "A route that requires authentication before its children can load",
      "A route with more than one URL parameter",
      "A lazy-loaded route inside another lazy-loaded route",
    ],
    correctAnswer:
      "A route rendered inside another route's <RouterView> — for shared layouts",
    explanation:
      "Nested routes let a parent component (SettingsLayout) render a persistent sidebar or header while child routes swap out the main content area via a <RouterView> inside the parent. This avoids duplicating layout code across views and keeps the URL structure logical.",
  },
  {
    topic: "router",
    difficulty: "hard",
    question: "What does router.push() return and why does it matter?",
    answers: [
      "A Promise — so you can await it or catch navigation errors",
      "The new route object after navigation completes",
      "A boolean indicating if navigation succeeded",
      "Nothing — it is a fire-and-forget function",
    ],
    correctAnswer: "A Promise — so you can await it or catch navigation errors",
    explanation:
      'router.push() returns a Promise that resolves when navigation is complete or rejects if a navigation guard cancels it. This means you can await router.push("/quiz") and know the route has fully resolved, or catch errors when navigation is blocked by a guard. Most developers miss this and skip error handling.',
  },
  {
    topic: "router",
    difficulty: "hard",
    question:
      "What is the difference between router.push() and router.replace()?",
    answers: [
      "push() adds to browser history; replace() overwrites the current entry",
      "replace() is faster because it skips the navigation guards",
      "push() works for named routes only; replace() works for path strings",
      "They are identical in Vue Router 4",
    ],
    correctAnswer:
      "push() adds to browser history; replace() overwrites the current entry",
    explanation:
      'router.push("/results") means the user can press Back to return to the quiz. router.replace("/results") replaces the current history entry, so pressing Back goes to wherever the user was before the quiz started. Use replace() for redirects where going "back" to the intermediate page makes no sense.',
  },

  // ─────────────────────────────────────────
  // PINIA (10)
  // ─────────────────────────────────────────
  {
    topic: "pinia",
    difficulty: "easy",
    question: "What is the correct modern way to define a Pinia store?",
    code: `// Which is the "setup store" syntax?`,
    answers: [
      "export const useStore = defineStore('id', () => { ... })",
      "export const useStore = createStore({ state: () => ({}) })",
      "export const useStore = new Pinia.Store('id', {})",
      "export default defineStore({ id: 'store' })",
    ],
    correctAnswer: "export const useStore = defineStore('id', () => { ... })",
    explanation:
      "defineStore() with a setup function mirrors <script setup> — you use ref() for state, computed() for getters, and plain functions for actions. The string ID must be unique across all stores. This 'setup store' style is preferred in Vue 3 over the older options-style defineStore.",
  },
  {
    topic: "pinia",
    difficulty: "easy",
    question: "How do you use a Pinia store inside a component?",
    code: `import { useQuizStore } from '@/stores/useQuizStore'
// Next line?`,
    answers: [
      "const quiz = useQuizStore()",
      "const quiz = inject(useQuizStore)",
      "const quiz = useQuizStore.get()",
      "const quiz = store(useQuizStore)",
    ],
    correctAnswer: "const quiz = useQuizStore()",
    explanation:
      "You call the function returned by defineStore(). Pinia handles the singleton behind the scenes — calling useQuizStore() in two different components returns the exact same reactive store instance. No Provider or context setup needed unlike some other state libraries.",
  },
  {
    topic: "pinia",
    difficulty: "easy",
    question: "Where do you install Pinia in a Vue 3 app?",
    code: `// In main.js:
const app = createApp(App)
// How to add Pinia?`,
    answers: [
      "app.use(createPinia())",
      "app.install(pinia)",
      'app.provide("pinia", createPinia())',
      "Pinia installs itself automatically when you import a store",
    ],
    correctAnswer: "app.use(createPinia())",
    explanation:
      "createPinia() creates the Pinia instance and app.use() registers it as a Vue plugin. This must happen before app.mount() and before any store is accessed. In tests, you call setActivePinia(createPinia()) instead to create a fresh isolated store for each test.",
  },
  {
    topic: "pinia",
    difficulty: "medium",
    question:
      "Why should you NOT destructure state directly from a Pinia store?",
    code: `const store = useQuizStore()
const { score } = store // is this ok?`,
    answers: [
      "Destructuring breaks reactivity — score becomes a plain number",
      "Destructuring is fine — Pinia handles it automatically",
      "You should use computed() to wrap each property instead",
      "Pinia stores cannot be destructured at all",
    ],
    correctAnswer:
      "Destructuring breaks reactivity — score becomes a plain number",
    explanation:
      "When you destructure { score } from a store, score gets the current value as a plain non-reactive number. The template displays it once and never updates. Use storeToRefs(store) to destructure state and getters as live refs. Actions are plain functions so they can be destructured directly.",
  },
  {
    topic: "pinia",
    difficulty: "medium",
    question: "What does storeToRefs() do?",
    code: `const store = useQuizStore()
const { score, status } = storeToRefs(store)`,
    answers: [
      "Converts store state and getters into refs that stay reactive when destructured",
      "Creates a readonly snapshot of the store for safe sharing",
      "Converts all store actions into reactive computed properties",
      "Syncs the store state with a localStorage backup",
    ],
    correctAnswer:
      "Converts store state and getters into refs that stay reactive when destructured",
    explanation:
      "storeToRefs() wraps each state property and getter in a ref so they maintain their reactive connection after destructuring. score.value stays in sync with the store. Important: only destructure state and getters with storeToRefs() — actions should be destructured directly from the store object.",
  },
  {
    topic: "pinia",
    difficulty: "medium",
    question: "In a setup store, what is the equivalent of a Vuex getter?",
    code: `export const useStore = defineStore('quiz', () => {
  const score = ref(0)
  const total = ref(10)
  // How to create a derived "percentage" value?
})`,
    answers: [
      "const percentage = computed(() => Math.round(score.value / total.value * 100))",
      "const getters = { percentage: () => score.value / total.value }",
      "function getPercentage() { return score.value / total.value }",
      "const percentage = ref(computed(() => score.value / total.value))",
    ],
    correctAnswer:
      "const percentage = computed(() => Math.round(score.value / total.value * 100))",
    explanation:
      "In setup stores, computed() refs become getters automatically. They are cached, reactive, and only recalculate when their dependencies change. When you return percentage from the store, it behaves exactly like a Vuex getter — components can read store.percentage reactively.",
  },
  {
    topic: "pinia",
    difficulty: "medium",
    question: "How do you reset a setup store to its initial state?",
    answers: [
      "Manually reset each ref in a resetStore action — setup stores have no $reset()",
      "Call store.$reset() — it is built into every Pinia store",
      "Call store.$patch({}) with an empty object",
      "Recreate the store with useStore(true) passing a reset flag",
    ],
    correctAnswer:
      "Manually reset each ref in a resetStore action — setup stores have no $reset()",
    explanation:
      "Options-style Pinia stores get a $reset() method automatically because Pinia can re-run the state factory. Setup stores use arbitrary code so Pinia cannot know how to reset them. The solution is a manual resetStore action that reassigns every ref back to its initial value — which is what our resetQuiz() action does.",
  },
  {
    topic: "pinia",
    difficulty: "hard",
    question: "What is a Pinia plugin and what can it do?",
    answers: [
      "A function that extends every store — used for persistence, logging, or devtools",
      "A Vite plugin that enables Pinia hot module replacement",
      "A composable that adds computed properties to any store",
      "A Vue directive that syncs store state with the template",
    ],
    correctAnswer:
      "A function that extends every store — used for persistence, logging, or devtools",
    explanation:
      "Pinia plugins receive every store instance and can add properties, wrap actions, or subscribe to changes. pinia-plugin-persistedstate uses this to automatically sync any store to localStorage with one line of config. You register plugins with pinia.use(myPlugin) before the app mounts.",
  },
  {
    topic: "pinia",
    difficulty: "hard",
    question: "What does store.$patch() do?",
    code: `store.$patch({
  score: 5,
  status: 'active'
})`,
    answers: [
      "Updates multiple state properties in a single reactive operation",
      "Merges a partial store definition into the existing store",
      "Replaces the entire store state with the given object",
      "Creates a temporary snapshot of the store for undo/redo",
    ],
    correctAnswer:
      "Updates multiple state properties in a single reactive operation",
    explanation:
      "$patch() batches multiple state changes into one update, triggering only one re-render instead of one per property. It also accepts a function for complex mutations: store.$patch(state => { state.items.push(item) }). It works on both options and setup stores.",
  },
  {
    topic: "pinia",
    difficulty: "hard",
    question:
      "How do you subscribe to store action calls for logging or side effects?",
    code: `const store = useQuizStore()
// Listen to every action call`,
    answers: [
      "store.$onAction(({ name, after, onError }) => { ... })",
      "store.$watch('actions', handler)",
      "watchEffect(() => store.$lastAction)",
      "store.subscribe('action', handler)",
    ],
    correctAnswer: "store.$onAction(({ name, after, onError }) => { ... })",
    explanation:
      "$onAction() runs a callback before each action, receiving the action name, arguments, and hooks to run after completion or on error. This is how you add logging, analytics, or error reporting to every store action without modifying each action individually. The subscription is automatically removed when the component unmounts.",
  },

  // ─────────────────────────────────────────
  // PERFORMANCE (10)
  // ─────────────────────────────────────────
  {
    topic: "performance",
    difficulty: "easy",
    question: "What does v-once do in Vue 3?",
    code: `<p v-once>{{ expensiveValue }}</p>`,
    answers: [
      "Renders the element once and skips all future updates",
      "Runs the expression only during the first user interaction",
      "Caches the element in the browser memory between routes",
      "Prevents the element from being garbage collected",
    ],
    correctAnswer: "Renders the element once and skips all future updates",
    explanation:
      "v-once renders the element and its children as static content on the first render and then treats them as non-reactive. Vue skips them entirely in future re-renders. Use it for truly static content that will never change — like a page title or a copyright notice.",
  },
  {
    topic: "performance",
    difficulty: "easy",
    question: "What is the purpose of the <KeepAlive> component?",
    code: `<KeepAlive>
  <component :is="activeView" />
</KeepAlive>`,
    answers: [
      "Caches component instances so they are not destroyed when switching views",
      "Prevents a component from unmounting during page transitions",
      "Keeps a component's data alive after the user navigates away",
      "Stops Vue from garbage collecting reactive state",
    ],
    correctAnswer:
      "Caches component instances so they are not destroyed when switching views",
    explanation:
      "<KeepAlive> caches the component instance in memory instead of destroying it when it becomes inactive. When the component becomes active again, it is restored from cache without re-mounting. The cached component fires onActivated and onDeactivated lifecycle hooks instead of onMounted and onUnmounted.",
  },
  {
    topic: "performance",
    difficulty: "medium",
    question: "What does v-memo do and when should you use it?",
    code: `<div v-for="item in list"
     v-memo="[item.id, item.selected]">`,
    answers: [
      "Skips re-rendering the element if the memo array values are unchanged",
      "Caches the element in localStorage between sessions",
      "Memoizes a computed property inside the loop",
      "Prevents the element from being removed from the DOM",
    ],
    correctAnswer:
      "Skips re-rendering the element if the memo array values are unchanged",
    explanation:
      "v-memo is a micro-optimisation for large v-for lists. Vue skips the virtual DOM diff for that element if every value in the dependency array is the same as last render. Use it when a list has hundreds of items and each row has expensive rendering logic. For small lists the overhead is not worth it.",
  },
  {
    topic: "performance",
    difficulty: "medium",
    question: "What is the difference between ref() and shallowRef()?",
    code: `const list = shallowRef([{ name: 'Vue' }])
list.value[0].name = 'React' // triggers update?`,
    answers: [
      "No update — shallowRef only reacts to .value being replaced, not nested changes",
      "Yes — shallowRef still tracks nested property changes",
      "shallowRef throws an error when you mutate nested properties",
      "shallowRef and ref behave identically for arrays",
    ],
    correctAnswer:
      "No update — shallowRef only reacts to .value being replaced, not nested changes",
    explanation:
      "shallowRef() only makes .value itself reactive — mutating a nested property does not trigger an update. To force an update after mutating nested data, call triggerRef(list). Use shallowRef for large datasets (like quiz questions) that you replace entirely — it avoids the cost of deeply tracking every nested property.",
  },
  {
    topic: "performance",
    difficulty: "medium",
    question: "What does defineAsyncComponent() do?",
    code: `const HeavyChart = defineAsyncComponent(
  () => import('./HeavyChart.vue')
)`,
    answers: [
      "Lazily loads a component only when it is first rendered",
      "Loads a component in a Web Worker to avoid blocking the main thread",
      "Caches a component permanently after the first load",
      "The same as a regular import — just more verbose syntax",
    ],
    correctAnswer: "Lazily loads a component only when it is first rendered",
    explanation:
      "defineAsyncComponent() code-splits a component into its own chunk loaded on demand. Unlike route-level lazy loading which splits by page, this splits at the component level — useful for heavy components (charts, rich editors, maps) that appear conditionally. Pair it with <Suspense> for a loading fallback.",
  },
  {
    topic: "performance",
    difficulty: "medium",
    question: "When should you use shallowReactive() instead of reactive()?",
    answers: [
      "When you have a large object and only the top-level properties need to be reactive",
      "When you want to prevent any mutations to the object",
      "When the object contains circular references that crash deep tracking",
      "shallowReactive() is deprecated — always use reactive()",
    ],
    correctAnswer:
      "When you have a large object and only the top-level properties need to be reactive",
    explanation:
      "reactive() deeply converts all nested objects into reactive proxies — this has a runtime cost proportional to nesting depth. shallowReactive() only makes top-level properties reactive. Nested objects remain plain. This is useful for configuration objects or large data structures where you only observe top-level changes.",
  },
  {
    topic: "performance",
    difficulty: "hard",
    question:
      "What is the virtual DOM and how does Vue use it for performance?",
    answers: [
      "A JS object tree mirroring the real DOM — Vue diffs it to find minimal DOM updates",
      "A browser API that sandboxes DOM manipulation for security",
      "A cached copy of the previous render stored in localStorage",
      "A Vue-specific DOM renderer that bypasses the browser layout engine",
    ],
    correctAnswer:
      "A JS object tree mirroring the real DOM — Vue diffs it to find minimal DOM updates",
    explanation:
      "When state changes, Vue re-renders to a new virtual DOM tree and diffs it against the previous one (reconciliation). Only the actual differences are applied to the real DOM — which is slow to update. This batching and diffing is what makes modern reactive frameworks efficient even with frequent state changes.",
  },
  {
    topic: "performance",
    difficulty: "hard",
    question:
      "What does the compiler hint /*@__PURE__*/ do in Vue's compiled output?",
    answers: [
      "Marks a function call as side-effect-free so bundlers can tree-shake it",
      "Tells the Vue runtime to cache the component instance permanently",
      "Prevents the function from being included in the production bundle",
      "Marks the component as a pure functional component with no state",
    ],
    correctAnswer:
      "Marks a function call as side-effect-free so bundlers can tree-shake it",
    explanation:
      "Vue's template compiler annotates hoisted static nodes with /*@__PURE__*/ so bundlers like Rollup and esbuild know they have no side effects. If the component is never actually used, the entire node can be tree-shaken from the bundle. This is part of Vue 3's significant bundle size improvements over Vue 2.",
  },
  {
    topic: "performance",
    difficulty: "hard",
    question: "What is static hoisting in Vue 3's compiler?",
    answers: [
      "Moving static vnodes outside the render function so they are created once",
      "Hoisting CSS from scoped styles into global stylesheets at build time",
      "Pre-rendering static routes to HTML files during the build",
      "Moving import statements to the top of the compiled output",
    ],
    correctAnswer:
      "Moving static vnodes outside the render function so they are created once",
    explanation:
      "Vue 3's compiler detects elements with no dynamic bindings and hoists them as constants outside the render function. On re-render, these static nodes are reused as-is — no re-creation, no diffing. For a component that re-renders 100 times, a hoisted static node is created exactly once. This is automatic and requires no developer action.",
  },
  {
    topic: "performance",
    difficulty: "hard",
    question: "What does the Suspense component do for async components?",
    code: `<Suspense>
  <template #default><AsyncChart /></template>
  <template #fallback><Spinner /></template>
</Suspense>`,
    answers: [
      "Shows the fallback slot while the async component is loading, then swaps to default",
      "Suspends all reactivity updates until the async component resolves",
      "Caches the async component response in the browser cache",
      "Delays rendering by one tick to allow the event loop to clear",
    ],
    correctAnswer:
      "Shows the fallback slot while the async component is loading, then swaps to default",
    explanation:
      "<Suspense> coordinates the loading state of async components and async setup() functions. While any descendant is awaiting, the #fallback slot renders. Once all async operations resolve, it swaps to the #default slot. This removes the need for manual isLoading flags in parent components that contain async children.",
  },
];
