<script setup lang="ts">
// 1. 引入 R_Text
import RText from '../Component Library/Resume_Show/R_Text.vue'

// 2. 定義資料介面
interface EducationItem {
  id: number
  degree: string
  school: string
  year: string
  icon: string // 這裡用來存 'school' 這類字串
}

// 3. 接收 Props 並設定預設值 (直接把假資料寫在裡面)
withDefaults(
  defineProps<{
    educations?: EducationItem[]
  }>(),
  {
    // 這裡要對應上面的 prop 名稱 "educations"
    educations: () => [
      {
        id: 1,
        degree: 'M.S. in Human-Computer Interaction',
        school: 'University of Design',
        year: '2015 - 2017',
        icon: 'school',
      },
      {
        id: 2,
        degree: 'B.S. in Graphic Design',
        school: 'State College',
        year: '2011 - 2015',
        icon: 'school',
      },
      
    ],
  },
)
</script>

<template>
  <section class="edu-section">
    <RText text="Education" class="edu-title" />

    <div class="edu-grid">
      <div v-for="item in educations" :key="item.id" class="edu-item">
        <div class="edu-icon-wrapper">
          <div class="edu-icon">
            <span class="material-symbols-outlined icon-symbol">
              {{ item.icon }}
            </span>
          </div>
        </div>

        <div>
          <h3 class="edu-degree">{{ item.degree }}</h3>
          <p class="edu-school">{{ item.school }}</p>
          <p class="edu-year">{{ item.year }}</p>
        </div>
      </div>
    </div>

  </section>
</template>

<style scoped>
/* CSS 完全保持原樣，直接貼上即可 */

/* 1. 區塊容器設定*/
.edu-title {
  color: var(--name-color);
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  /* 補充：抵銷 R_Text 可能帶有的 margin-top，視情況調整 */
  margin-top: 0;
}

/* 2. Grid 排版 */
.edu-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

@media (min-width: 768px) {
  .edu-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* 項目佈局 */
.edu-item {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

/* 3. Icon 樣式 */
.edu-icon-wrapper {
  flex-shrink: 0;
}

.edu-icon {
  width: 3rem;
  height: 3rem;
  border-radius: 0.75rem;
  background-color: var(--icon-box-bg);
  color: var(--icon-box-fg);
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
}

/* Icon size */
.icon-symbol {
  font-size: 3rem !important;
}

/* 4. 文字樣式 */
.edu-degree {
  font-size: 1.35rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 0.25rem;
}

.edu-school {
  font-size: 1.15rem;
  color: var(--title-color);
  font-weight: 500;
  margin-bottom: 0.25rem;
}

.edu-year {
  font-size: 1rem;
  margin-top: 0;
  color: var(--color-text-mute);
}
</style>
