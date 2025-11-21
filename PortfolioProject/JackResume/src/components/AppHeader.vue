<script setup lang="ts">
import { useTheme } from '../router/useTheme'
// 引入 RouterLink 和 RouterView (雖然 RouterView 不在這裡使用，但為了完整性)
import { RouterLink } from 'vue-router'
const { isDark, toggleTheme } = useTheme()
</script>

<template>
  <header class="main-header">
    <nav class="nav-links">
      <RouterLink to="/" class="nav-link">履歷展示</RouterLink>
      <RouterLink to="/about" class="nav-link">關於</RouterLink>
      <RouterLink to="/back" class="nav-link">後台管理</RouterLink>
    </nav>

    <div class="theme-toggle">
      <span class="toggle-label">主題切換：</span>
      <label class="switch">
        <input type="checkbox" :checked="isDark" @change="toggleTheme" />
        <span class="slider round"></span>
      </label>
    </div>
  </header>
</template>

<style scoped>
/* Header Layout*/
.main-header {
  padding: 1rem 2rem;
  display: flex; /* 使用 Flexbox 佈局 */
  justify-content: space-between; /* 連結和開關分佈在兩側 */
  align-items: center;
  border-bottom: 2px solid var(--icon-box-bg); /* 使用變數作為邊界 */
  background-color: var(--resume-card-bg); /* 背景色使用卡片變數 */
}

/* 導航連結容器 */
.nav-links {
  display: flex;
  gap: 1.5rem;
}

/* 導航連結樣式 */
.nav-link {
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  color: var(--color-text); /* 預設文字顏色 */
  padding: 0.5rem 0.25rem;
  transition: color 0.2s, border-bottom 0.2s;
}

/* 懸停效果 */
.nav-link:hover {
  color: var(--name-color); /* 懸停時使用主橘色 */
}

/* 活躍狀態 (當前分頁) */
.router-link-active {
  color: var(--name-color); /* 活躍時使用主橘色 */
  border-bottom: 3px solid var(--name-color); /* 增加底線強調 */
}

/* 主題切換區域 */
.theme-toggle {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.toggle-label {
  color: var(--color-text);
  font-size: 0.95rem;
}


/* =======================================================
   Switch 樣式 (微調以符合新佈局)
   ======================================================= */
.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
  margin-left: 0; /* 移除多餘的 margin-left */
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 24px;
}

.slider:before {
  position: absolute;
  content: '';
  height: 18px;
  width: 18px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}

/* 使用品牌色作為開關啟用色 */
input:checked + .slider {
  background-color: var(--name-color);
}

input:checked + .slider:before {
  transform: translateX(26px);
}

.slider.round {
  border-radius: 24px;
}
</style>