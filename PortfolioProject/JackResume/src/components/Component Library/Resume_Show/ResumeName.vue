<script setup lang="ts">
defineProps<{ firstname: string; lastname: string }>()
</script>

<template>
  <h1 class="first-name">{{ firstname }}</h1>
  <h2 class="last-name">{{ lastname }}</h2>
</template>

<style scoped>
.first-name {
  /* 使用變數：名字顏色 (橘色) */
  color: var(--name-color);
  margin: 0;
  font-size: 3rem;
  line-height: 1.2;
}

.last-name {
  margin: 0;
  /* 使用變數：職稱顏色 (粉色) */
  color: var(--title-color);
  font-size: 40px;
}
</style>
