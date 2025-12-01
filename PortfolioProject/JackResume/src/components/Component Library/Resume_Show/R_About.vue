<script setup lang="ts">
defineProps<{
  // paragraph: string
  bullets: string[]
}>()
</script>

<template>
  <div class="resume-block about-me-block">

    <!-- <p class="about-paragraph">{{ paragraph }}</p> -->

    <ul class="bullet-list">
      <li v-for="(item, index) in bullets" :key="index" class="bullet-item">
        <span>{{ item }}</span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
/* 標題樣式 */
.section-title {
  color: var(--name-color);
  margin: 0;
  font-size: 40px;
  font-weight: 600;
  text-shadow: 1px 1px 2px rgba(251, 113, 133, 0.1);
}
/*
內文段落樣式
.about-paragraph {
  text-indent: 2em;
  color: var(--color-text);
  line-height: 1.8;
  margin-bottom: 1.5rem;
  font-size: 1.0625rem;

   ✨ 關鍵新增：保留換行符號 (配合後台 textarea)
  white-space: pre-line;
} */


/* 項目列表容器 */
.bullet-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  color: var(--color-text);
  padding: 0; /* 清除 ul 預設 padding，視需求調整 */
  list-style: none; /* 清除預設黑點 */
}

/* 列表項目卡片 */
.bullet-item {
  display: flex;
  gap: 1rem;
  background-color: var(--resume-card-bg);
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
  background-color: rgba(255, 255, 255, 0.95);
  border-left-color: var(--name-color);
}
</style>
