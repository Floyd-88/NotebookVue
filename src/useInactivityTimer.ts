import { onUnmounted } from 'vue'

// Таймер для отслеживания неактивности
export function useInactivityTimer(callback: () => void, delay: number) {
  let inactivityTimeout: number | null = null

  const startTimer = () => {
    stopTimer() 
    inactivityTimeout = window.setTimeout(callback, delay)
  }

  const stopTimer = () => {
    if (inactivityTimeout !== null) {
      clearTimeout(inactivityTimeout)
      inactivityTimeout = null
    }
  }

  const handleUserActivity = () => {
    startTimer()
  }

  window.addEventListener('click', handleUserActivity)
  window.addEventListener('keypress', handleUserActivity)
  window.addEventListener('scroll', handleUserActivity)
  window.addEventListener('input', handleUserActivity)

  onUnmounted(() => {
    stopTimer()
    window.removeEventListener('click', handleUserActivity)
    window.removeEventListener('keypress', handleUserActivity)
    window.removeEventListener('scroll', handleUserActivity)
    window.removeEventListener('input', handleUserActivity)
  })

  return {
    startTimer,
    stopTimer
  }
}
