<script setup lang="ts">
import { ref } from 'vue'

// --- 1. 數據結構定義 ---

interface EducationItem {
  id: number
  eduDegree: string // 學位名稱 (e.g., M.S. in HCI)
  eduSchool: string // 學校名稱 (e.g., University of Design)
  eduYear: string // 年份範圍 (e.g., 2015 - 2017)
}

type EducationData = EducationItem[]

// --- 2. 初始數據 ---

const initialEducation: EducationData = [
  {
    id: 1,
    eduDegree: 'M.S. in Human-Computer Interaction',
    eduSchool: 'University of Design',
    eduYear: '2015 - 2017',
  },
  {
    id: 2,
    eduDegree: 'B.S. in Graphic Design',
    eduSchool: 'State College',
    eduYear: '2011 - 2015',
  },
]

// 確保數據是響應式且獨立的 (深層拷貝)
const editableEducation = ref<EducationData>(JSON.parse(JSON.stringify(initialEducation)))

// --- 3. CRUD 函式 ---

// C: 新增學歷區塊
const addNewEducation = () => {
  // 沿用我們討論過的安全 ID 生成邏輯
  const currentIds = editableEducation.value.map((e) => e.id)
  const newId = currentIds.length > 0 ? Math.max(...currentIds) + 1 : 1

  editableEducation.value.push({
    id: newId,
    eduDegree: 'New Degree Name',
    eduSchool: 'New University Name',
    eduYear: 'Year Range',
  })
}

// D: 刪除學歷區塊
const deleteEducation = (eduId: number) => {
  editableEducation.value = editableEducation.value.filter((edu) => edu.id !== eduId)
}
</script>

<template>
  <div class="admin-block">
    <h2>🎓 學歷編輯</h2>

    <div class="add-item-section">
      <button @click="addNewEducation" class="btn btn-primary">
        <span class="material-symbols-outlined icon-symbol">add_circle</span>
        新增學歷項目
      </button>
    </div>

    <div class="edu-list">
      <div v-for="edu in editableEducation" :key="edu.id" class="edu-card">
        <button @click="deleteEducation(edu.id)" class="btn btn-icon delete-btn" title="刪除此學歷">
          <span class="material-symbols-outlined">delete</span>
        </button>

        <div class="input-group">
          <label>學位名稱 (Degree)</label>
          <input
            v-model="edu.eduDegree"
            class="input-text"
            placeholder="例如：M.S. in Human-Computer Interaction"
          />
        </div>

        <div class="input-group">
          <label>學校名稱 (School)</label>
          <input
            v-model="edu.eduSchool"
            class="input-text"
            placeholder="例如：University of Design"
          />
        </div>

        <div class="input-group">
          <label>年份範圍 (Year)</label>
          <input v-model="edu.eduYear" class="input-text" placeholder="例如：2015 - 2017" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 容器和標題 (與工作經驗 Admin 區塊保持一致) */
.admin-block {
  padding: 20px;
  background-color: var(--color-background-mute);
  border-radius: 8px;
  border: 1px solid var(--color-border);
  margin-bottom: 2rem;
}

.admin-block h2 {
  color: var(--color-heading);
  margin-bottom: 1rem;
}

/* 新增按鈕區塊 */
.add-item-section {
  text-align: center;
  margin-bottom: 2rem;
}

.btn {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  transition: background-color 0.2s;
}

.btn-primary {
  /* 使用主橘色 */
  background-color: var(--brand-orange);
  color: white;
}

.btn-primary:hover {
  background-color: #e06d0a;
}

/* 項目卡片樣式 */
.edu-card {
  border: 1px solid var(--card-border);
  background-color: var(--resume-card-bg);
  padding: 20px;
  border-radius: 6px;
  margin-bottom: 20px;
  position: relative; /* 為了刪除按鈕定位 */
}

/* 刪除按鈕 */
.delete-btn {
  background: none;
  color: var(--brand-pink); /* 使用粉色作為刪除警示色 */
  padding: 5px;
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 10;
}

.delete-btn:hover {
  background-color: var(--brand-bg-soft);
}

/* 輸入組件 */
.input-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: 600;
  margin-bottom: 5px;
  color: var(--color-text);
  font-size: 0.9rem;
}

.input-text {
  width: 100%;
  padding: 8px 10px;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.input-text:focus {
  border-color: var(--brand-orange);
  outline: none;
}
</style>
