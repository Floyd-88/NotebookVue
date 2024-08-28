<template>
  <div class="container">
    <template v-if="isLoader">
      <component :is="currentComponent" :articles="articles" @handleAddArticle="handleAddArticle" />
    </template>
    <LoaderVue v-else />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { getArticles, setArticles } from './api'
import { useInactivityTimer } from './useInactivityTimer'
import AssemblyVue_1 from './components/AssemblyVue_1.vue'
import AssemblyVue_2 from './components/AssemblyVue_2.vue'
import AssemblyVue_3 from './components/AssemblyVue_3.vue'
import LoaderVue from './components/UniversalComponent/LoaderVue.vue'

const articles = ref<string[]>([])

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

const isLoader = ref<boolean>(true)

// Загрузка статей при монтировании
onMounted(async () => {
  isLoader.value = false
  const fetchedArticles = await getArticles()
  isLoader.value = true
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

function handleAddArticle(article: string) {
  if (article) {
    articles.value.push(article)
  }
  saveArticles()
}
</script>

<style scoped>
</style>
