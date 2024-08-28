<template>
  <div class="wrapper">
    <div class="buttons" v-if="articleNum === -1">
      <template v-if="articles.length > 0">
        <button
          class="buttons-btn"
          @click="openArticle(index)"
          v-for="(button, index) in articles"
          :key="index"
        >
          {{ `Статья_${index + 1}` }}
        </button>
      </template>

      <NotArticles v-else />

      <button class="buttons-btn" @click="addArticle">+</button>
      <input type="text" placeholder="start typing|" v-model.trim="textArticle" />
    </div>
    <div class="article-text" v-else>
      <div class="text">{{ article }}</div>
      <button class="article-btn" @click="closeArticle">&lt;</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import NotArticles from './UniversalComponent/NotArticles.vue'

const articleNum = ref<number>(-1)
const textArticle = ref<string>('')

const props = defineProps<{ articles: string[] }>()
const emit = defineEmits<{ (e: 'handleAddArticle', payload: string): void }>()

const article = computed(() => {
  if (articleNum.value >= 0) {
    return props.articles[articleNum.value]
  }
  return ''
})

function openArticle(id: number) {
  articleNum.value = id
}

function closeArticle() {
  articleNum.value = -1
  // emit('handleAddArticle')
}

function addArticle() {
  if (textArticle.value.length > 2) {
    emit('handleAddArticle', textArticle.value)
    textArticle.value = ''
  }
}
</script>

<style scoped>
.buttons {
  display: flex;
  flex-direction: column;
  gap: 4vw;
}
.buttons-btn {
  height: 14vw;
  color: #f58529;
  background-color: #202020;
  border: none;
  border-radius: 1vw;
  cursor: pointer;
}

.buttons-btn:hover {
  background-color: #383838;
}

input {
  height: 14vw;
  text-align: center;
  border: none;
  border-radius: 1vw;
  background-color: #202020;
  color: #6f6f6f;
}

.article-text {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.text {
  flex: 1;
}

.article-btn {
  display: flex;
  justify-content: center;
  align-items: center;
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

.article-btn {
  width: 7vw;
  height: 7vw;
}

input {
  height: 7vw;
}
}
</style>
