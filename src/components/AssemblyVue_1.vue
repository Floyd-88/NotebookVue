<template>
  <div class="wrapper">
    <div class="text-article">
      <AssemblyVueText v-model="textArticle" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AssemblyVueText from './AssemblyVueText.vue'

const textArticle = ref<string>('')
</script>

<style scoped>
.wrapper {
  width: 100%;
  height: 100vh;
}

.text-article {
  height: 100%;
  box-sizing: border-box;
}
</style>
