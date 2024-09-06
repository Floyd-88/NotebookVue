<template>
  <div class="wrapper">
    <div class="text-article">
      <AssemblyVueText v-model="textArticle" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import AssemblyVueText from '@/components/AssemblyVueText.vue'
import type { ArticleI } from '@/types/types'

const props = defineProps<{ articles: ArticleI[] }>()
const emit = defineEmits<{
  (e: 'handleAddArticle', payload: ArticleI[]): void
  (e: 'handleChangeArticle', payload: ArticleI): void
  (e: 'saveArticles'): void
}>()

const article = ref<ArticleI | null>(null)
const textArticle = ref<string>('')

const initializeArticle = () => {
  if (props.articles.length > 0) {
    article.value = props.articles[0]
    textArticle.value = props.articles[0].text || ''
  } else {
    article.value = null
    textArticle.value = ''
  }
}

onMounted(() => {
  initializeArticle()
})

watch(textArticle, (newValue) => {
  if (article.value) {
    const updatedArticle = { ...article.value, text: newValue }
    emit('handleChangeArticle', updatedArticle)
  } else {
    const newArticle: ArticleI = {
      id: 1,
      title: 'article title',
      text: newValue || ''
    }
    emit('handleAddArticle', [newArticle])
    article.value = newArticle
  }
})

watch(
  () => props.articles,
  (newArticles) => {
    if (newArticles.length > 0) {
      article.value = newArticles[0]
      textArticle.value = newArticles[0].text || ''
    } else {
      article.value = null
      textArticle.value = ''
    }
  },
  { immediate: true }
)
</script>

<style scoped>
.wrapper {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  margin: 0;
  padding: 0;
}

.text-article {
  height: 100%;
  box-sizing: border-box;
  margin: 0;
}
</style>
