<template>
  <section class="edu-section">
    <h2 class="edu-title">Education</h2>

    <div class="edu-grid">
      <div class="edu-item">
        <div class="edu-icon-wrapper">
          <div class="edu-icon">
            <span class="material-symbols-outlined icon-symbol">school</span>
          </div>
        </div>
        <div>
          <h3 class="edu-degree">M.S. in Human-Computer Interaction</h3>
          <p class="edu-school">University of Design</p>
          <p class="edu-year">2015 - 2017</p>
        </div>
      </div>

      <div class="edu-item">
        <div class="edu-icon-wrapper">
          <div class="edu-icon">
            <span class="material-symbols-outlined icon-symbol">school</span>
          </div>
        </div>
        <div>
          <h3 class="edu-degree">B.S. in Graphic Design</h3>
          <p class="edu-school">State College</p>
          <p class="edu-year">2011 - 2015</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* 1. 區塊容器設定*/
.edu-title {
  /* ✨ 標題顏色使用主橘色 */
  color: var(--name-color);
  font-size: 2rem; /* 放大標題 */
  font-weight: 700;
  margin-bottom: 1.5rem; /* 增加間距 */
  /* 移除底線，讓它更像一個獨立的標題 */
  /* padding-bottom: 12px;
  border-bottom: 1px solid var(--border-light); */
}

/* 移除 .dark .edu-title 的覆寫，使用單一變數控制 */

/* 2. Grid 排版 (保持不變) */
.edu-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem; /* 增加間距 */
}

@media (min-width: 768px) {
  .edu-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* 項目佈局 (保持不變) */
.edu-item {
  display: flex;
  gap: 1rem;
  align-items: flex-start; /* 讓 icon 對齊頂部 */
}

/* 3. Icon 樣式 (模仿 Contact 區塊) */
.edu-icon-wrapper {
  flex-shrink: 0;
}

.edu-icon {
  /* ✨ 使用 Contact 區塊的樣式設定 */
  width: 3rem; /* 方塊大小 */
  height: 3rem;
  border-radius: 0.75rem; /* 圓角 */

  /* ✨ 使用變數：Icon 背景色 */
  background-color: var(--icon-box-bg);
  /* ✨ 使用變數：Icon 本體顏色 (橘色) */
  color: var(--icon-box-fg);

  display: flex;
  align-items: center;
  justify-content: center;

  transition:
    background-color 0.3s ease,
    color 0.3s ease;
}

/* 移除 .dark .edu-icon 的覆寫 */

/* Icon size */
.icon-symbol {
  font-size: 1.5rem !important; /* 調整為 1.5rem */
}

/* 4. 文字樣式 (使用變數)*/
/* Degree title (學位名稱) */
.edu-degree {
  /* ✨ 放大標題，使用一般文字色 */
  font-size: 1.35rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 0.25rem;
}

/* 移除 .dark .edu-degree 的覆寫 */

/* School (學校名稱) */
.edu-school {
  /* ✨ 使用粉色作為強調色 (與工作經驗的公司名稱統一) */
  font-size: 1.15rem;
  color: var(--title-color);
  font-weight: 500;
  margin-bottom: 0.25rem;
}

/* Year text (年份) */
.edu-year {
  /* 使用靜音文字顏色 */
  font-size: 1rem;
  margin-top: 0;
  color: var(--color-text-mute);
}

/* 移除 .dark .edu-year 的覆寫 */
</style>
