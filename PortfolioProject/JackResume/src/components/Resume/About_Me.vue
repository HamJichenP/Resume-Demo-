<script setup lang="ts">
import { ref } from 'vue'
import RSkillList from '@/components/Component Library/Resume_Show/R_List.vue'

const aboutme = ref(
  'I grew up in a family that encouraged independent thinking and a hands-on approach to problem-solving. My parents, both small business owners, instilled in me an appreciation for responsibility and fostered a practical, proactive (or "never-procrastinating") attitude towards work and life.',
)

const skillItems = ref([
  'Proficient in JavaScript, TypeScript, and Vue.js framework.',
  'Experience with RESTful APIs and GraphQL.',
  'Strong understanding of responsive design and cross-browser compatibility.',
  'Familiar with version control systems like Git.',
])
</script>

<template>
  <div class="resume-block about-me-block">
    <h2 class="section-title">About Me</h2>

    <p class="about-paragraph">{{ aboutme }}</p>

    <RSkillList class="my-custom-list" :bullets="skillItems" />
  </div>
</template>

<style scoped>
/* =========================================
   1. 卡片容器 (Outer Card)
   這會建立一個大張的卡片，背景色跟 Header 一致
   ========================================= */
.resume-block {
  /* 背景色：使用 base.css 定義的卡片背景 (淺色是米色，深色是深灰) */
  background-color: var(--resume-card-bg);

  /* 內距：給予足夠的呼吸空間 */
  padding: 1rem 1rem;
}

/* =========================================
   2. 標題 (About Me)
   ========================================= */
.section-title {
  /* 顏色：使用品牌主色 (橘色) */
  color: var(--name-color);

  /* 字體設定 */
  font-size: 2.25rem; /* 36px */
  font-weight: 600;
  line-height: 1.2;
}

/* =========================================
   3. 內文段落 (Paragraph)
   ========================================= */
.about-paragraph {
  /* 顏色：一般文字顏色 */
  color: var(--color-text);

  /* 字體大小與行高 */
  font-size: 1.125rem; /* 18px */
  line-height: 1.75;

  /* 關鍵：保留文字中的換行格式 */
  white-space: pre-line;
  text-indent: 2rem; /* 首行縮排 */
}

.my-custom-list {
  margin-top: 1.5rem; /* 與上方段落保持距離 */
}

.resume-block :deep(.bullet-item) {
  /* 修改清單項目的背景色 */
  background-color: var(--icon-box-bg);
}
</style>
