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
    <div class="text">
      {{ article }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

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
  width: 100%;
  gap: 10px;
}

.buttons-btn {
  width: 80px;
  height: 25px;
  background-color: #202020;
  border: 1px solid #000000;
  border-radius: 5px;
  color: #FFFFFF;
  cursor: pointer;
}

.buttons-btn:hover {
    background-color: #414141;
}

.text {
  margin-top: 25px;
}

.active {
  color: #F58529;
}
</style>
