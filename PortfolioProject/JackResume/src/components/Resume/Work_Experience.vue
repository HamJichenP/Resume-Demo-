<template>
  <div class="resume-block work-experience">
    <h2 class="work-section-title">Work Experience</h2>

    <div class="timeline">
      <div class="timeline-item">
        <div class="timeline-marker">
          <div class="timeline-dot"></div>
        </div>
        <div class="timeline-content">
          <div class="timeline-date-inline">2018-09 - 2021-10</div>
          <div class="job-header">
            <h3 class="job-title">Product Designer</h3>
            <p class="job-company">DesignStudio</p>
          </div>
          <ul class="job-responsibilities">
            <li class="exp-item">
              <span
                >Designed mobile and web applications for various clients across industries</span
              >
            </li>
          </ul>
        </div>
      </div>

      <div class="timeline-item">
        <div class="timeline-marker">
          <div class="timeline-dot"></div>
        </div>
        <div class="timeline-content">
          <div class="timeline-date-inline">2021-10 - Ongoing</div>
          <div class="job-header">
            <h3 class="job-title">Senior Product Designer</h3>
            <p class="job-company">TechCorp Inc.</p>
          </div>
          <ul class="job-responsibilities">
            <li class="exp-item">
              <span>Lead design initiatives for flagship SaaS platform serving 100K+ users</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* =======================================================
   1. 區塊容器設定
   ======================================================= */

.work-section-title {
  /* 使用變數：標題使用較深的品牌橘色 */
  color: var(--name-color);
  font-size: 2.2rem; /* 放大字體 */
  margin-bottom: 1.5rem; /* 標題下方間距 */
}

/* =======================================================
   2. 時間線容器與中線
   ======================================================= */
.timeline {
  /* 移除 max-width: 800px; 讓它佔滿整個父元件，由父元件的 padding 限制寬度 */
  margin: 0;
  width: 100%;
  position: relative;
  padding: 0;
}

/* 垂直中心線 */
.timeline::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 2rem;
  bottom: 0;
  width: 10px; /* 將線條寬度調窄，視覺上更精緻 */
  transform: translateX(-50%);
  /* 使用變數：中線顏色使用較淺的橘色 */
  background: var(--icon-box-fg);
  opacity: 0.5; /* 讓線條不要太搶眼 */
}

.timeline-item {
  position: relative;
  width: 100%;
  margin: 2rem 0; /* 調整項目間的垂直間距 */
}

.timeline-item:last-child {
  margin-bottom: 0;
}

/* =======================================================
   3. 時間線標記點 (Marker)
   ======================================================= */
.timeline-marker {
  position: absolute;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
  z-index: 2;
  /* 調整 Marker 大小，讓它與內容對齊 */
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.timeline-dot {
  /* 讓點本身小一點，外圍光暈用 box-shadow 模擬 */
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  /* 使用變數：點的顏色 */
  background: var(--name-color);
  /* 使用變數：光暈的顏色 */
  box-shadow:
    0 0 0 4px var(--resume-card-bg),
    0 0 0 5px var(--icon-box-fg);
  /* 讓點在深色模式下有對比 */
  position: relative;
  z-index: 3;
}

/* =======================================================
   4. 內容區塊 (Content)
   ======================================================= */

.timeline-content {
  /* 重新計算寬度: 50% 減去半個 Marker 寬度 (0.75rem) 和一些間隔 (1rem) */
  width: calc(50% - 1.75rem);
  padding: 0.5rem; /* 內容內部的微量間距 */
}

/* 日期文本 */
.timeline-date-inline {
  font-size: 18px;
  /* 使用變數：靜音文字顏色 */
  color: var(--color-text-mute);
  margin: 0 0 0.5rem 0; /* 調整與標題的間距 */
}

/* --- 奇數 (左側) 項目 --- */
.timeline-item:nth-child(odd) .timeline-content {
  margin-right: auto;
  text-align: right;
}

/* --- 偶數 (右側) 項目 --- */
.timeline-item:nth-child(even) .timeline-content {
  margin-left: auto;
  text-align: left;
}

/* =======================================================
   5. 文本樣式
   ======================================================= */
.job-header {
  margin-bottom: 0.5rem;
}

.job-title {
  /* 使用變數：職位名稱使用較深橘色 */
  color: var(--name-color);
  margin: 5px 0;
  font-size: 1.25rem;
  font-weight: 600;
}

.job-company {
  /* 使用變數：公司名稱使用粉色 */
  color: var(--title-color);
  margin: 5px 0;
  font-size: 1rem;
}

.job-responsibilities {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin: 10px 0;
  /* 使用變數：項目文字顏色 */
  color: var(--color-text);
  list-style: disc; /* 確保圓點列表樣式 */
}

/* --- 偶數 (右側) 列表的特殊對齊 --- */
.timeline-item:nth-child(even) .job-responsibilities {
  list-style-position: outside; /* 使用 outside 確保文字能夠對齊 */
  padding-left: 1.25rem; /* 給予足夠的左側空間顯示圓點 */
  margin-left: 0;
}

/* 確保文字對齊 */
.timeline-item:nth-child(even) .job-responsibilities li {
  text-indent: 0;
  padding-left: 0;
}

/* --- 奇數 (左側) 列表的特殊對齊 --- */
.timeline-item:nth-child(odd) .job-responsibilities {
  /* 左側列表使用 inside 搭配 text-align: right 實現視覺上的右對齊 */
  list-style-position: inside;
  padding-right: 1.25rem; /* 給予足夠的右側空間顯示圓點 */
  margin-right: 0;
}

.timeline-item:nth-child(odd) .job-responsibilities li {
  /* text-align: right 配合 list-style-position: inside */
  text-indent: 0;
  padding-right: 0;
}
</style>
