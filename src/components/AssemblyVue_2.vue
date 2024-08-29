<template>
  <div class="wrapper">
    <div class="buttons" v-if="articles.length > 0">
      <button
        class="buttons-btn"
        @click="changeArticleNum(index)"
        v-for="(articleItem, index) in articles"
        :key="articleItem.id"
        :class="{ active: articleNum === index }"
      >
        {{ articleItem.title }}
      </button>
    </div>
    <NotArticles v-else />

    <div class="text-article">
      <AssemblyVueText v-model="textArticle" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import NotArticles from './UniversalComponent/NotArticles.vue'
import type { ArticleI } from '@/types/types'
import AssemblyVueText from './AssemblyVueText.vue'

const props = defineProps<{ articles: ArticleI[] }>()
const emit = defineEmits<{
  (e: 'saveArticles'): void
  (e: 'handleChangeArticle', payload: ArticleI): void
}>()

const article = ref<ArticleI | null>(null)
const articleNum = ref<number>(0)
const textArticle = ref<string>('')

onMounted(() => {
  if (props.articles.length > 0) {
    const initialArticle = props.articles[0]
    article.value = initialArticle
    textArticle.value = initialArticle.text
  }
})

function changeArticleNum(index: number) {
  articleNum.value = index
  const selectedArticle = props.articles[index]
  article.value = selectedArticle
  textArticle.value = selectedArticle.text
  emit('saveArticles')
}

watch(textArticle, () => {
  if (article.value) {
    const updatedArticle = { ...article.value, text: textArticle.value }
    emit('handleChangeArticle', updatedArticle)
  }
})
</script>

<style scoped>
.wrapper {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  overflow-x: auto;
}

.buttons {
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  width: 100%;
  overflow: auto;
  gap: 2.5vw;
  background-color: #000000;
  box-sizing: border-box;
  z-index: 10;
}

.buttons-btn {
  display: flex;
  align-items: center;
  height: 8vw;
  background-color: #202020;
  border: none;
  border-radius: 1vw;
  color: #ffffff;
  cursor: pointer;
  white-space: nowrap;
}

.buttons-btn:hover {
  background-color: #414141;
}

.text-article {
  /* height: 100%; */
  flex: 1;
  margin-top: 2vw;
  box-sizing: border-box;
}

.active {
  color: #f58529;
}

/* Медиа-запрос для экранов шире 900px */
@media (min-width: 900px) {
  .buttons {
    overflow: hidden;
    scrollbar-width: thin;
    gap: 2vw;
  }

  .buttons:hover {
    overflow: auto;
  }

  .buttons-btn {
    height: 3vw;
  }
}
</style>
