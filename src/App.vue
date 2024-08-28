<template>
  <div class="container">
    <component :is="currentComponent" :articles="articles" v-on="componentEvents" />
  </div>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent, onMounted, onUnmounted, ref } from 'vue'
import { getArticles, setArticles } from './api'
import { useInactivityTimer } from './useInactivityTimer'
const AssemblyVue_1 = defineAsyncComponent(() => import('./components/AssemblyVue_1.vue'))
const AssemblyVue_2 = defineAsyncComponent(() => import('./components/AssemblyVue_2.vue'))
const AssemblyVue_3 = defineAsyncComponent(() => import('./components/AssemblyVue_3.vue'))

const articles = ref<string[]>([
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laboru1.',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laboru2.',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laboru3.',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laboru4.'
])

const currentComponent = computed(() => {
  console.log(import.meta.env.VITE_BUILD_TYPE)
  const buildType = import.meta.env.VITE_BUILD_TYPE
  switch (buildType) {
    case 'сборка1':
      return AssemblyVue_1
    case 'сборка2':
      return AssemblyVue_2
    case 'сборка3':
      return AssemblyVue_3
    default:
      return AssemblyVue_1
  }
})

// Загрузка статей при монтировании
onMounted(async () => {
  const fetchedArticles = await getArticles()
  if (fetchedArticles.length > 0) {
    articles.value = fetchedArticles
  }
  startInactivityTimer() // Запускаем таймер
})

// Сохранение статей при демонтировании компонента
onUnmounted(async () => {
  await saveArticles()
  stopInactivityTimer() // Останавливаем таймер
})

// Функция для сохранения статей
const saveArticles = async () => {
  await setArticles(articles.value)
}

// Настройка таймера для неактивности
const { startTimer: startInactivityTimer, stopTimer: stopInactivityTimer } = useInactivityTimer(
  saveArticles,
  30000
)

// Определяем события, которые будут переданы компоненту
const componentEvents = computed(() => {
  const buildType = import.meta.env.VITE_BUILD_TYPE
  // Поддержка события addArticle только для AssemblyVue_3
  if (buildType === 'сборка3') {
    return {
      'addArticle': handleAddArticle
    }
  }
  return {}
})

function handleAddArticle(article: string) {
  if (article) {
    articles.value.push(article)
  }
  saveArticles()
}
</script>

<style scoped></style>
