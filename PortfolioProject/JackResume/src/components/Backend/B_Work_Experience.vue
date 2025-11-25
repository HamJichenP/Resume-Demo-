<script setup lang="ts">
import { ref } from 'vue'

// --- 1. 數據結構定義 ---

interface Responsibility {
  id: number
  text: string
}

interface WorkExperienceItem {
  id: number
  startDate: string
  endDate: string // e.g., '2021-10' or 'Ongoing'
  jobTitle: string
  jobCompany: string
  responsibilities: Responsibility[]
  // 用於控制職責列表的輸入框內容
  newResponsibilityText: string
}

type WorkExperienceData = WorkExperienceItem[]

// --- 2. 初始數據 ---

const initialWorkExperience: WorkExperienceData = [
  {
    id: 1,
    startDate: '2018-09',
    endDate: '2021-10',
    jobTitle: 'Product Designer',
    jobCompany: 'DesignStudio',
    responsibilities: [
      { id: 1, text: 'Designed mobile and web applications for various clients across industries' },
    ],
    newResponsibilityText: '',
  },
  {
    id: 2,
    startDate: '2021-10',
    endDate: 'Ongoing',
    jobTitle: 'Senior Product Designer',
    jobCompany: 'TechCorp Inc.',
    responsibilities: [
      { id: 1, text: 'Lead design initiatives for flagship SaaS platform serving 100K+ users' },
    ],
    newResponsibilityText: '',
  },
]

// 確保數據是響應式且獨立的 (深層拷貝)
const editableWorkExperience = ref<WorkExperienceData>(
  JSON.parse(JSON.stringify(initialWorkExperience)),
)

// --- 3. CRUD 函式 ---

// C: 新增一個新的工作經驗區塊
const addNewJob = () => {
  const currentIds = editableWorkExperience.value.map((j) => j.id)
  const newId = currentIds.length > 0 ? Math.max(...currentIds) + 1 : 1

  editableWorkExperience.value.push({
    id: newId,
    startDate: '',
    endDate: 'Ongoing',
    jobTitle: 'New Job Title',
    jobCompany: 'New Company',
    responsibilities: [],
    newResponsibilityText: '',
  })
}

// D: 刪除整個工作經驗區塊
const deleteJob = (jobId: number) => {
  // 使用 filter 篩選掉目標 ID 的項目
  editableWorkExperience.value = editableWorkExperience.value.filter((job) => job.id !== jobId)
}

// --- 4. 職責列表的 CRUD 函式 ---

// C: 新增單一職責
const addNewResponsibility = (job: WorkExperienceItem) => {
  if (job.newResponsibilityText.trim() === '') return

  const currentIds = job.responsibilities.map((r) => r.id)
  const newId = currentIds.length > 0 ? Math.max(...currentIds) + 1 : 1

  job.responsibilities.push({
    id: newId,
    text: job.newResponsibilityText.trim(),
  })

  // 清空輸入框
  job.newResponsibilityText = ''
}

// D: 刪除單一職責
const deleteResponsibility = (job: WorkExperienceItem, respId: number) => {
  job.responsibilities = job.responsibilities.filter((resp) => resp.id !== respId)
}
</script>

<template>
  <div class="admin-block work-experience-admin">
    <h2>💼 工作經歷編輯</h2>

    <div class="add-job-section">
      <button @click="addNewJob" class="btn btn-primary">
        <span class="material-symbols-outlined icon-symbol">add_circle</span>
        新增工作經歷區塊
      </button>
    </div>

    <div class="job-list">
      <div v-for="job in editableWorkExperience" :key="job.id" class="job-card">
        <div class="job-card-header">
          <button @click="deleteJob(job.id)" class="btn btn-icon delete-btn" title="刪除此工作經歷">
            <span class="material-symbols-outlined">delete</span>
          </button>
        </div>

        <div class="input-group">
          <label>職位名稱</label>
          <input
            v-model="job.jobTitle"
            class="input-text"
            placeholder="例如：Senior Product Designer"
          />
        </div>

        <div class="input-group">
          <label>公司名稱</label>
          <input v-model="job.jobCompany" class="input-text" placeholder="例如：TechCorp Inc." />
        </div>

        <div class="input-group-inline">
          <div class="input-group">
            <label>起始日期</label>
            <input
              v-model="job.startDate"
              type="date"
              class="input-text"
              placeholder="例如：2021-10"
            />
          </div>
          <div class="input-group">
            <label>結束日期</label>
            <input
              v-model="job.endDate"
              type="date"
              class="input-text"
              placeholder="例如：Ongoing 或 2024-05"
            />
          </div>
        </div>

        <div class="responsibilities-section">
          <h4>職責與成果 (Responsibilities)</h4>

          <ul class="resp-list">
            <li v-for="resp in job.responsibilities" :key="resp.id" class="resp-item-edit">
              <textarea v-model="resp.text" class="input-text small-input" rows="3"></textarea>
              <button
                @click="deleteResponsibility(job, resp.id)"
                class="btn btn-icon delete-resp-btn"
              >
                <span class="material-symbols-outlined">close</span>
              </button>
            </li>
          </ul>

          <div class="add-resp-group">
            <textarea
              v-model="job.newResponsibilityText"
              rows="5"
              class="input-text small-input"
              placeholder="新增一個職責描述..."
            ></textarea>
            <button @click="addNewResponsibility(job)" class="btn btn-secondary">新增</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 容器和標題 */
.admin-block {
  padding: 20px;
  background-color: var(--color-background-soft);
  border-radius: 8px;
  border: 1px solid var(--color-border);
  margin-bottom: 2rem;
}

.admin-block h2 {
  color: var(--color-heading);
  margin-bottom: 1rem;
}

/* 新增區塊按鈕 */
.add-job-section {
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
  background-color: var(--brand-orange);
  color: white;
}

.btn-primary:hover {
  background-color: #e06d0a; /* A slightly darker orange */
}

/* 工作卡片樣式 */
.job-card {
  border: 1px solid var(--card-border);
  background-color: var(--vt-c-white);
  padding: 20px;
  border-radius: 6px;
  margin-bottom: 20px;
  position: relative;
}

.job-card-header {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 0.5rem;
}

.delete-btn {
  background: none;
  color: var(--brand-pink);
  padding: 5px;
  position: absolute;
  top: 10px;
  right: 10px;
}

.delete-btn:hover {
  background-color: var(--brand-bg-soft);
}

/* 輸入組件 */
.input-group {
  margin-bottom: 15px;
}

.input-group-inline {
  display: flex;
  gap: 15px;
}

.input-group-inline .input-group {
  flex: 1;
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

/* 職責列表 */
.responsibilities-section h4 {
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  font-size: 1rem;
  color: var(--brand-orange);
}

.resp-list {
  list-style: none;
  padding: 0;
  margin-bottom: 1rem;
}

.resp-item-edit {
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 5px;
}

.small-input {
  flex-grow: 1;
  font-size: 0.9rem;
  padding: 6px 8px;
}

.delete-resp-btn {
  background: none;
  color: var(--color-text-mute);
  padding: 3px;
}

.delete-resp-btn:hover {
  color: var(--brand-pink);
}

.add-resp-group {
  display: flex;
  gap: 10px;
}

.btn-secondary {
  background-color: var(--icon-box-bg);
  color: var(--brand-orange);
}
.btn-secondary:hover {
  background-color: var(--vt-c-white-mute);
}
</style>
