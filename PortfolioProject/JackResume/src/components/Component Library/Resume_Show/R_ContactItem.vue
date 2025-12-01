<script setup lang="ts">
import GithubIcon from '@/assets/icons/GithubIcon.vue' // 確保路徑正確

defineProps<{
  icon: string
  text: string
}>()

// 判斷邏輯：如果是 'github' 回傳組件，不然回傳 'div'
const getComponent = (name: string) => {
  return name === 'github' ? GithubIcon : 'div'
}
</script>

<template>
  <div class="contact-item">
    <component :is="getComponent(icon)" class="edu-icon">
      <span v-if="icon !== 'github'" class="material-symbols-outlined icon-symbol">
        {{ icon }}
      </span>
    </component>
    <span>{{ text }}</span>
  </div>
</template>

<style scoped>
/* 這裡貼上你原本的 CSS */
.contact-item {
  display: flex;
  align-items: center;
  gap: 0.875rem;
  color: var(--color-text);
  font-size: 20px;
}
.edu-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: 0.75rem;
  background-color: var(--icon-box-bg);
  color: var(--icon-box-fg);
  flex-shrink: 0;
}
.icon-symbol {
  font-size: 3rem;
}
.edu-icon :deep(svg) {
  width: 2.5rem;
  height: 3rem;
  fill: currentColor;
}
</style>
