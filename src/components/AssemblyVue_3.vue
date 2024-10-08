<template>
  <div class="wrapper">
    <div class="wrapper-items" v-if="!article" @scroll="resetArticleMode">
      <ArticleList :articles="articles" @openArticle="openArticle" />

      <NotArticles v-if="articles.length === 0" />

      <div class="wrapper-input">
        <ArticleInput
          :titleArticle="titleArticle"
          @saveArticleIfNeeded="saveArticleIfNeeded"
          @updateTitle="updateTitle"
        />
      </div>
    </div>

    <div class="article-text" v-else>
      <AssemblyVueText v-model="textArticle" />
      <button class="article-btn" @click="closeArticle">&lt;</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onUnmounted, onMounted } from 'vue'
import ArticleList from '@/components/ArticleList.vue'
import ArticleInput from '@/components/ArticleInput.vue'
import AssemblyVueText from '@/components/AssemblyVueText.vue'
import NotArticles from '@/components/UniversalComponent/NotArticles.vue'
import type { ArticleI } from '@/types/types'

const props = defineProps<{ articles: ArticleI[] }>()
const emit = defineEmits<{
  (e: 'handleAddArticle', payload: ArticleI[]): void
  (e: 'handleChangeArticle', payload: ArticleI): void
  (e: 'saveArticles'): void
}>()

const article = ref<ArticleI | null>(null)
const titleArticle = ref<string>('')
const textArticle = ref<string>('')

function openArticle(articleItem: ArticleI) {
  textArticle.value = articleItem.text
  article.value = articleItem
}

function closeArticle() {
  emit('saveArticles')
  textArticle.value = ''
  article.value = null
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
  }
}

function updateTitle(title: string) {
  titleArticle.value = title
}

function resetArticleMode() {
  if (titleArticle.value.length > 0) {
    saveArticleIfNeeded()
  }
}

function saveArticleIfNeeded() {
  if (titleArticle.value.length > 0) {
    addArticle()
  }
}

watch(textArticle, () => {
  if (article.value) {
    const updatedArticle = { ...article.value, text: textArticle.value }
    emit('handleChangeArticle', updatedArticle)
  }
})

// Обработка событий перед выгрузкой страницы
function handleBeforeUnload(event: BeforeUnloadEvent) {
  event.preventDefault()
  saveArticleIfNeeded()
  event.returnValue = ''
}

onMounted(async () => {
  window.addEventListener('beforeunload', handleBeforeUnload)
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
}

.wrapper-items {
  flex: 1;
  overflow: auto;
  max-height: 100vh;
  padding-bottom: 10vw;
}

.wrapper-input {
  height: 14vw;
  margin-top: 4vw;
}

.article-text {
  height: 100%;
  box-sizing: border-box;
}

.text {
  flex: 1;
}

.article-btn {
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  width: 15vw;
  height: 15vw;
  background-color: #202020;
  border: none;
  border-radius: 1vw;
  color: #f58529;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
}

.article-btn:hover {
  background-color: #393939;
}

/* Медиа-запрос для экранов шире 900px */
@media (min-width: 900px) {
  .article-btn {
    width: 7vw;
    height: 7vw;
  }

  .wrapper-items {
    overflow: hidden;
    padding-bottom: 5vw;
    scrollbar-width: thin;
  }

  .wrapper-items:hover {
    overflow: auto;
  }

  .wrapper-input {
    margin-top: 2vw;
    height: 7vw;
  }
}
</style>
