<script setup lang="ts">
defineProps<{
  bullets: string[]
}>()
</script>

<template>
  <div class="resume-block">
    <ul class="bullet-list">
      <li v-for="(item, index) in bullets" :key="index" class="bullet-item">
        <span>{{ item }}</span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
/* 項目列表容器 */
.bullet-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0;
  list-style: none;
}

/* 列表項目卡片 */
.bullet-item {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  border-radius: 0.5rem;
  border-left: 4px solid var(--title-color);
  box-shadow: 0 2px 4px rgba(249, 115, 22, 0.1);
  transition:
    transform 0.2s ease,
    background-color 0.2s ease,
    border-left-color 0.2s ease;
}

/* 懸停效果 */
.bullet-item:hover {
  transform: translateX(8px);
}
</style>
