<template>
  <div class="resume-block about-me-block">
    <h2 class="section-title">About Me</h2>
    <p class="about-paragraph">
      I'm a passionate product designer with over 8 years of experience creating user-centered digital experiences.
      My work focuses on bridging the gap between user needs and business goals through thoughtful design solutions.
      I believe in the power of collaboration, accessibility, and continuous learning to create products that truly make a difference.
    </p>
    <ul class="bullet-list">
      <li class="bullet-item">
        <span>Specialized in design systems, user research, and cross-functional collaboration</span>
      </li>
      <li class="bullet-item">
        <span>Strong advocate for accessibility and inclusive design practices</span>
      </li>
      <li class="bullet-item">
        <span>Experienced in leading design teams and mentoring junior designers</span>
      </li>
    </ul>
  </div>
</template>

<style scoped>

/* 標題樣式 */
.section-title {
  /* 使用變數: 名字或 Icon 的主橘色 */
  color: var(--name-color);
  margin: 0;

  /* margin-left: 39px; */
  font-size: 40px;
  font-weight: 600;
  /* 淺色的陰影 (可選，深色模式可能需要調整) */
  text-shadow: 1px 1px 2px rgba(251, 113, 133, 0.1);
}

/* 內文段落樣式 */
.about-paragraph {
  text-indent: 2em; /* 段首縮進 */
  /* 使用變數: 一般文字顏色 */
  color: var(--color-text);
  line-height: 1.8;
  margin-bottom: 1.5rem;
  font-size: 1.0625rem;
}

/* 項目列表容器 */
.bullet-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  /* 列表文字顏色使用全站變數，由 bullet-item 繼承 */
  color: var(--color-text);
}

/* 列表項目卡片 */
.bullet-item {
  display: flex;
  gap: 1rem;
  /* 為了呈現圖片中的淺黃色，但要保持透明度，我們使用一個更淺的背景色變數或半透明 */
  /* 這裡假設父元件的背景是 var(--resume-card-bg) */
  background-color: var(--resume-card-bg);
  padding: 1rem;
  border-radius: 0.5rem;

  /* 項目邊框使用變數: 職稱的粉色 (圖中下方項目為粉色邊框) */
  border-left: 4px solid var(--title-color);
  /* 陰影使用變數: 淺橘色陰影 */
  box-shadow: 0 2px 4px rgba(249, 115, 22, 0.1);

  transition: transform 0.2s ease, background-color 0.2s ease, border-left-color 0.2s ease;
}

/* 懸停效果 */
.bullet-item:hover {
  transform: translateX(8px);
  /* 懸停時，背景稍微變亮一點 */
  background-color: rgba(255, 255, 255, 0.95);
  /* 懸停時，左側邊框變為 Icon 的橘色 (主色) */
  border-left-color: var(--name-color);
}

/* 刪除未使用的樣式，或調整為正確結構 */
/* .bullet-point {}
.bullet-item span:not(.bullet-point) {} */
</style>