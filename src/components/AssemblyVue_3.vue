<template>
  <div class="wrapper">
    <div class="wrapper-items" v-if="!article">
      <ul class="buttons" v-if="articles.length > 0">
        <li class="item-button" v-for="articleItem in articles" :key="articleItem.id">
          <button class="buttons-btn" @click="openArticle(articleItem)">
            {{ articleItem.title }}
          </button>
        </li>
      </ul>
      <NotArticles v-else />

      <div class="wrapper-input">
        <button class="buttons-btn" @click="startNewArticle" v-if="isTextArticle">+</button>
        <input
          type="text"
          placeholder="start typing|"
          v-else
          ref="titleInput"
          v-model.trim="titleArticle"
          @blur="handleBlur"
          @keydown.enter="handleBlur"
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
import { ref, nextTick, watch, onUnmounted, onMounted } from 'vue'
import NotArticles from './UniversalComponent/NotArticles.vue'
import type { ArticleI } from '@/types/types'
import AssemblyVueText from './AssemblyVueText.vue'

defineProps<{ articles: ArticleI[] }>()
const emit = defineEmits<{
  (e: 'handleAddArticle', payload: ArticleI): void
  (e: 'handleChangeArticle', payload: ArticleI): void
  (e: 'saveArticles'): void
}>()

const article = ref<ArticleI | null>(null)
const titleArticle = ref<string>('')
const isTextArticle = ref<boolean>(true)
const textArticle = ref<string>('')
const titleInput = ref<HTMLInputElement | null>(null)

function openArticle(articleItem: ArticleI) {
  textArticle.value = articleItem.text
  article.value = articleItem
}

function closeArticle() {
  emit('saveArticles')
  textArticle.value = ''
  article.value = null
}

function startNewArticle() {
  isTextArticle.value = false
  nextTick(() => {
    titleInput.value?.focus()
  })
}

onMounted(async () => {
  window.addEventListener('beforeunload', handleBeforeUnload)
})

onUnmounted(async () => {
  window.removeEventListener('beforeunload', handleBeforeUnload)
})

function handleBlur() {
  if (titleArticle.value.length >= 1) {

    addArticle()
  }
  isTextArticle.value = true
}

function addArticle() {
  const newArticle: ArticleI = {
    id: Date.now(),
    title: titleArticle.value,
    text: ''
  }
  console.log(newArticle)
  emit('handleAddArticle', newArticle)
  titleArticle.value = ''
}

watch(textArticle, () => {
  if (article.value) {
    const updatedArticle = { ...article.value, text: textArticle.value }
    emit('handleChangeArticle', updatedArticle)
  }
})

// Обработка событий перед выгрузкой страницы
function handleBeforeUnload(event: BeforeUnloadEvent) {
  event.preventDefault();
  handleBlur()

}
</script>

<style scoped>
.wrapper {
  width: 100%;
  height: 100vh;
}

.wrapper-items {
  flex: 1;
  overflow: auto;
  max-height: 100vh;
  padding-bottom: 10vw;
}

.buttons {
  display: flex;
  flex-direction: column;
  gap: 4vw;
}

.buttons-btn {
  height: 14vw;
  width: 100%;
  color: #f58529;
  background-color: #202020;
  border: none;
  border-radius: 1vw;
  cursor: pointer;
}

.buttons-btn:hover {
  background-color: #383838;
}

.wrapper-input {
  margin-top: 4vw;
}

input {
  height: 14vw;
  width: 100%;
  text-align: center;
  border: none;
  border-radius: 1vw;
  background-color: #202020;
  color: #6f6f6f;
}

input:focus {
  border: 1px solid #f58529;
  outline: none;
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
}

.article-btn:hover {
  background-color: #393939;
}

/* Медиа-запрос для экранов шире 900px */
@media (min-width: 900px) {
  .buttons {
    gap: 2vw;
  }

  .buttons-btn {
    height: 7vw;
  }

  .wrapper-input {
    margin-top: 2vw;
  }

  .article-btn {
    width: 7vw;
    height: 7vw;
  }

  input {
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
}
</style>
