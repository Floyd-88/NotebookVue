import { ref, onUnmounted } from 'vue';

// Таймер для отслеживания неактивности
export function useInactivityTimer(callback: () => void, delay: number) {
  const inactivityTimeout = ref<NodeJS.Timeout | null>(null);

  // Функция запуска таймера
  const startTimer = () => {
    stopTimer(); // Останавливаем предыдущий таймер, если есть
    inactivityTimeout.value = setTimeout(() => {
      callback(); // Вызываем callback при истечении времени
    }, delay);
  };

  // Функция остановки таймера
  const stopTimer = () => {
    if (inactivityTimeout.value) {
      clearTimeout(inactivityTimeout.value);
      inactivityTimeout.value = null;
    }
  };

  // Обработчик активности пользователя
  const handleUserActivity = () => {
    startTimer(); // Сбрасываем таймер при активности
  };

  // Добавляем обработчики активности
  window.addEventListener('click', handleUserActivity);
  window.addEventListener('keypress', handleUserActivity);
  window.addEventListener('mousemove', handleUserActivity);
  window.addEventListener('scroll', handleUserActivity);

  // Очищаем таймеры и обработчики событий при уничтожении компонента
  onUnmounted(() => {
    stopTimer();
    window.removeEventListener('click', handleUserActivity);
    window.removeEventListener('keypress', handleUserActivity);
    window.removeEventListener('mousemove', handleUserActivity);
    window.removeEventListener('scroll', handleUserActivity);
  });

  // Возвращаем функции управления таймером
  return {
    startTimer,
    stopTimer
  };
}
