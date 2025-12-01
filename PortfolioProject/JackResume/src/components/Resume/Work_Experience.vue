<script setup lang="ts">
import RText from '../Component Library/Resume_Show/R_Text.vue'

// 定義資料結構
interface ExperienceItem {
  id: number
  date: string
  title: string
  company: string
  responsibilities: string[]
}

// === 修正：直接將假資料寫在預設值函式裡面 ===
// 這樣就不用擔心變數參照 (Hoisting) 的問題了
withDefaults(
  defineProps<{
    experiences?: ExperienceItem[]
  }>(),
  {
    experiences: () => [
      {
        id: 1,
        date: '2018-09 - 2021-10',
        title: 'Product Designer',
        company: 'DesignStudio',
        responsibilities: [
          'Designed mobile and web applications for various clients across industries.',
          'Collaborated with cross-functional teams to deliver high-quality products.',
          'Conducted user research to improve UX flows.',
        ],
      },
      {
        id: 2,
        date: '2021-10 - Ongoing',
        title: 'Senior Product Designer',
        company: 'TechCorp Inc.',
        responsibilities: [
          'Lead design initiatives for flagship SaaS platform serving 100K+ users.',
          'Mentored junior designers and established design systems.',
          'Optimized conversion rates by 15% through A/B testing.',
        ],
      },
      
    ],
  },
)
</script>

<template>
  <div class="resume-block work-experience">
    <RText text="Work Experience" class="work-section-title" />

    <div class="timeline">
      <div v-for="item in experiences" :key="item.id" class="timeline-item">
        <div class="timeline-marker">
          <div class="timeline-dot"></div>
        </div>

        <div class="timeline-content">
          <div class="timeline-date-inline">{{ item.date }}</div>
          <div class="job-header">
            <h3 class="job-title">{{ item.title }}</h3>
            <p class="job-company">{{ item.company }}</p>
          </div>
          <ul class="job-responsibilities">
            <li v-for="(resp, idx) in item.responsibilities" :key="idx" class="exp-item">
              <span>{{ resp }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 1. 區塊容器設定*/
.work-section-title {
  /* 使用變數：標題使用較深的品牌橘色 */
  color: var(--name-color);
  font-size: 2.2rem; /* 放大字體 */
  margin-bottom: 1.5rem; /* 標題下方間距 */

  /* 補充：確保 R_Text (h1) 的預設 margin 被覆蓋或保留，視需求而定 */
  margin-top: 0;
}

/* 2. 時間線容器與中線 */
.timeline {
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
  width: 10px;
  transform: translateX(-50%);
  background: var(--icon-box-fg);
  opacity: 0.5;
}

.timeline-item {
  position: relative;
  width: 100%;
  margin: 2rem 0;
}

.timeline-item:last-child {
  margin-bottom: 0;
}

/* 3. 時間線標記點 (Marker) */
.timeline-marker {
  position: absolute;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
  z-index: 2;
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.timeline-dot {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: var(--name-color);
  box-shadow:
    0 0 0 4px var(--resume-card-bg),
    0 0 0 5px var(--icon-box-fg);
  position: relative;
  z-index: 3;
}

/* 4. 內容區塊 (Content)*/
.timeline-content {
  width: calc(50% - 1.75rem);
  padding: 0.5rem;
}

/* 日期文本 */
.timeline-date-inline {
  font-size: 18px;
  color: var(--color-text-mute);
  margin: 0 0 0.5rem 0;
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

/* 5. 文本樣式*/
.job-header {
  margin-bottom: 0.5rem;
}

.job-title {
  color: var(--name-color);
  margin: 5px 0;
  font-size: 1.25rem;
  font-weight: 600;
}

.job-company {
  color: var(--title-color);
  margin: 5px 0;
  font-size: 1rem;
}

.job-responsibilities {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin: 10px 0;
  color: var(--color-text);
  list-style: disc;
}

/* --- 偶數 (右側) 列表的特殊對齊 --- */
.timeline-item:nth-child(even) .job-responsibilities {
  list-style-position: outside;
  padding-left: 1.25rem;
  margin-left: 0;
}

.timeline-item:nth-child(even) .job-responsibilities li {
  text-indent: 0;
  padding-left: 0;
}

/* --- 奇數 (左側) 列表的特殊對齊 --- */
.timeline-item:nth-child(odd) .job-responsibilities {
  list-style-position: inside;
  padding-right: 1.25rem;
  margin-right: 0;
}

.timeline-item:nth-child(odd) .job-responsibilities li {
  text-indent: 0;
  padding-right: 0;
}
</style>
