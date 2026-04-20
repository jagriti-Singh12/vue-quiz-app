import { ref, onUnmounted } from 'vue'

export function useTimer(initialSeconds = 30, onExpire = null) {
  let intervalId      = null
  const seconds       = ref(initialSeconds)
  const isRunning     = ref(false)

  function tick() {
    if (seconds.value <= 0) {
      pause()
      if (typeof onExpire === 'function') onExpire()
      return
    }
    seconds.value--
  }

  function start() {
    if (isRunning.value) return
    isRunning.value = true
    intervalId = setInterval(tick, 1000)
  }

  function pause() {
    isRunning.value = false
    clearInterval(intervalId)
    intervalId = null
  }

  function reset(newSeconds = initialSeconds) {
    pause()
    seconds.value = newSeconds
  }

  onUnmounted(() => clearInterval(intervalId))

  return { seconds, isRunning, start, pause, reset }
}