<script setup lang="ts">
import GithubIcon from '@/assets/GithubIcon.vue'
</script>

<template>
  <div class="resume-block">
    <div class="contact-section">
      <div class="photo-container">
        <img src="../icons/IMG_4391.jpg" alt="Professional headshot" class="profile-photo" />
      </div>

      <div class="contact-info">
        <h1 class="contact-name">Jack ChenP</h1>
        <p class="contact-title">陳柏瑋</p>

        <div class="contact-list">
          <div class="contact-item">
            <div class="edu-icon">
              <span class="material-symbols-outlined icon-symbol">Mail</span>
            </div>
            <span>john.anderson@email.com</span>
          </div>

          <div class="contact-item">
            <div class="edu-icon">
              <span class="material-symbols-outlined icon-symbol">Call</span>
            </div>
            <span>+1 (555) 123-4567</span>
          </div>

          <div class="contact-item">
            <div class="edu-icon">
              <span class="material-symbols-outlined icon-symbol">Home_Pin</span>
            </div>
            <span>San Francisco, CA</span>
          </div>

          <div class="contact-item">
            <div class="edu-icon">
              <GithubIcon />
            </div>
            <span>github.com/johnanderson</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.resume-block {
  /* 使用變數：背景色 (淺色時是米色，深色時是深灰) */
  background-color: var(--resume-card-bg);

  border-radius: 0.5rem;
  box-shadow:
    0 1px 3px 0 rgba(0, 0, 0, 0.1),
    0 1px 2px 0 rgba(0, 0, 0, 0.06);
  padding: 2rem;

  /* 過渡動畫：讓背景色切換時平滑 */
  transition: background-color 0.3s ease;
}

/* Block 1: Photo and Contact Layout */
.contact-section {
  display: flex;
  flex-direction: row;
  gap: 2rem;
  align-items: center;
  justify-content: flex-start;
}

.photo-container {
  margin-left: 55px;
  flex-shrink: 0;
}

.profile-photo {
  width: 15rem;
  height: 15rem;
  border-radius: 50%;
  object-fit: cover;
  /* 使用變數：照片邊框 */
  border: 4px solid var(--photo-border);
}

.contact-info {
  margin-left: 100px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.contact-header {
  margin-bottom: 2rem;
}

/* === 文字顏色設定 === */
.contact-name {
  /* 使用變數：名字顏色 (橘色) */
  color: var(--name-color);
  margin: 0;
  font-size: 3rem;
  line-height: 1.2;
}

.contact-title {
  margin: 0;
  /* 使用變數：職稱顏色 (粉色) */
  color: var(--title-color);
  font-size: 40px;
}

.contact-list {
  display: flex;
  flex-direction: column;
  gap: 10px; /* 方塊間距 */
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 0.875rem;
  /* 使用變數：一般文字顏色 (深灰/白) */
  color: var(--color-text);
  font-size: 20px;
  transition: color 0.3s ease;
}

/* === 關鍵樣式：Icon 的圓角方塊 === */
.edu-icon {
  display: flex;
  align-items: center;
  justify-content: center;

  /* 方塊大小固定 */
  width: 3rem;
  height: 3rem;

  /* 圓角與背景色 (使用變數) */
  border-radius: 0.75rem;
  background-color: var(--icon-box-bg);

  /* Icon 本體顏色 (使用變數) */
  color: var(--icon-box-fg);

  flex-shrink: 0;

  /* 過渡動畫 */
  transition: background-color 0.3s ease, color 0.3s ease;
}

/* Icon 字體大小 */
.icon-symbol {
  font-size: 1.5rem;
}

/* 針對 Github Icon (SVG) 的顏色控制 */
/* 使用 :deep() 穿透 scoped，確保能改到 SVG 內部 */
.edu-icon :deep(svg) {
  width: 1.5rem;
  height: 1.5rem;
  fill: currentColor; /* 讓 SVG 顏色跟隨上面的 color */
}
</style>