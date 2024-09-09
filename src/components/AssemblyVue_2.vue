<template>
  <div class="wrapper">
    <div class="buttons">
      <ArticleButtons
        :articles="articles"
        :articleNum="articleNum"
        @selectArticle="changeArticleNum"
      />
      <div class="wrapper-input">
        <div class="wrapper-input-block">
          <ArticleInput
            :titleArticle="titleArticle"
            @saveArticleIfNeeded="saveArticleIfNeeded"
            @updateTitle="updateTitle"
          />
        </div>
      </div>
    </div>

    <div class="text-article">
      <AssemblyVueText v-model="textArticle" @scroll="resetArticleMode" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import type { ArticleI } from '@/types/types'
import AssemblyVueText from '@/components/AssemblyVueText.vue'
import ArticleButtons from '@/components/ArticleButtons.vue'
import ArticleInput from './ArticleInput.vue'

const props = defineProps<{ articles: ArticleI[] }>()
const emit = defineEmits<{
  (e: 'handleAddArticle', payload: ArticleI[]): void
  (e: 'handleChangeArticle', payload: ArticleI): void
  (e: 'saveArticles'): void
}>()

const articleNum = ref<number>(0)
const textArticle = ref<string>('')
const titleArticle = ref<string>('')

const initializeArticle = () => {
  if (props.articles.length > 0) {
    articleNum.value = 0
    const initialArticle = props.articles[0]
    textArticle.value = initialArticle.text
  }
}

function addArticle() {
  if (titleArticle.value.length > 0) {
    const newArticle: ArticleI = {
      id: Date.now(),
      title: titleArticle.value,
      text: ''
    }
    let articles = [...props.articles, newArticle]
    emit('handleAddArticle', articles)
    titleArticle.value = ''
    articleNum.value = articles.length - 1
    textArticle.value = ''
  }
}

function updateTitle(title: string) {
  titleArticle.value = title
}

function saveArticleIfNeeded() {
  if (titleArticle.value.length > 0) {
    addArticle()
  }
}

function resetArticleMode() {
  if (titleArticle.value.length > 0) {
    saveArticleIfNeeded()
  }
}

function handleBeforeUnload(event: BeforeUnloadEvent) {
  event.preventDefault()
  saveArticleIfNeeded()
  event.returnValue = ''
}

function changeArticleNum(index: number) {
  articleNum.value = index
  const selectedArticle = props.articles[index]
  textArticle.value = selectedArticle.text
  emit('saveArticles')
}

watch(textArticle, (newText) => {
  if (props.articles[articleNum.value]) {
    const updatedArticle = { ...props.articles[articleNum.value], text: newText }
    emit('handleChangeArticle', updatedArticle)
  }
})

onMounted(async () => {
  window.addEventListener('beforeunload', handleBeforeUnload)
  initializeArticle()
})

onUnmounted(async () => {
  window.removeEventListener('beforeunload', handleBeforeUnload)
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

.text-article {
  flex: 1;
  margin-top: 2vw;
  box-sizing: border-box;
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

.wrapper-input-block {
  width: max-content;
  min-width: 9vw;
  height: 100%;
}

@media (min-width: 900px) {
  .buttons {
    overflow: hidden;
    scrollbar-width: thin;
    gap: 1.5vw;
  }

  .buttons:hover {
    overflow: auto;
  }

  .wrapper-input-block {
    min-width: 4vw;
  }
}
</style>
