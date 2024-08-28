<template>
  <div class="wrapper">
    <div class="buttons">
      <button
        class="buttons-btn"
        @click="changeArticleNum(index)"
        v-for="(button, index) in articles"
        :key="index"
        :class="{ active: articleNum === index }"
      >
        {{ `Статья_${index + 1}` }}
      </button>
    </div>
    <div class="text" v-if="articles.length > 0">
      {{ article }}
    </div>
    <NotArticles v-else/>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import NotArticles from './UniversalComponent/NotArticles.vue'

const props = defineProps<{ articles: string[] }>()
const articleNum = ref<number>(0)

const article = computed(() => {
  if (articleNum.value >= 0) {
    return props.articles[articleNum.value]
  }
  return ''
})

function changeArticleNum(index: number) {
    articleNum.value = index
}
</script>

<style scoped>
.buttons {
  display: flex;
  justify-content: space-between;
  /* flex-wrap: wrap; */
  width: 100%;
  gap: 10px;
}

.buttons-btn {
  width: 28vw;
  height: 8vw;
  background-color: #202020;
  border: none;
  border-radius: 1vw;
  color: #FFFFFF;
  cursor: pointer;
}

.buttons-btn:hover {
    background-color: #414141;
}

.text {
  margin-top: 7vw;
}

.active {
  color: #F58529;
}

/* Медиа-запрос для экранов шире 900px */
@media (min-width: 900px) {
  .buttons {
  gap: 2vw;
}

  .buttons-btn {
  width: 10vw;
  height: 3vw;
}

}

</style>
