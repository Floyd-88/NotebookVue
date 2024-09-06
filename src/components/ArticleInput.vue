<template>
  <button class="buttons-btn" @click="startNewArticle" v-if="!isTextArticle">+</button>
  <input
    v-else
    type="text"
    placeholder="start typing|"
    ref="titleInput"
    v-model.trim="localTitleArticle"
    @blur="handleInputBlur"
    @keydown.enter="handleInputBlur"
  />
</template>

<script setup lang="ts">
import { ref, nextTick, watch } from 'vue'

const props = defineProps<{
  titleArticle: string
}>()
const emit = defineEmits<{
  (e: 'saveArticleIfNeeded'): void
  (e: 'updateTitle', title: string): void
}>()

const titleInput = ref<HTMLInputElement | null>(null)
const localTitleArticle = ref(props.titleArticle)
const isTextArticle = ref<boolean>(false)

watch(
  () => props.titleArticle,
  (newValue) => {
    localTitleArticle.value = newValue
  }
)

watch(localTitleArticle, (newValue) => {
  emit('updateTitle', newValue)
})

function startNewArticle() {
  localTitleArticle.value = ''
  isTextArticle.value = true
  emit('updateTitle', '')

  nextTick(() => {
    titleInput.value?.focus()
  })
}

function handleInputBlur() {
  emit('saveArticleIfNeeded')
  isTextArticle.value = false
}
</script>

<style scoped>
.buttons-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  background-color: #202020;
  border: none;
  border-radius: 1vw;
  color: #f58529;
  cursor: pointer;
  white-space: nowrap;
}

.buttons-btn:hover {
  background-color: #383838;
}

input {
  height: 100%;
  width: 100%;
  text-align: center;
  border: none;
  border-radius: 1vw;
  background-color: #202020;
  box-sizing: border-box;
}

input:focus {
  border: 1px solid #f58529;
  outline: none;
  color: #6f6f6f;
}

@media (min-width: 900px) {
}
</style>
