<script setup lang="ts">
import { useWorkExperience } from '@/components/Component Library/Funtion/useWorkExperience'

import TextInput from '@/components/Component Library/Resume_Back/TextInput.vue'
import ButtonCPN from '@/components/Component Library/Resume_Back/ButtonCPN.vue'

const { workExperiences, addJob, removeJob, addResponsibility, removeResponsibility } =
  useWorkExperience()
</script>

<template>
  <div class="admin-block work-experience-admin">
    <h2>💼 工作經歷編輯</h2>

    <div class="add-job-section">
      <ButtonCPN @click="addJob" class="btn btn-primary">
        <span class="material-symbols-outlined icon-symbol">add_circle</span>
        新增工作經歷區塊
      </ButtonCPN>
    </div>

    <div class="job-list">
      <div v-for="job in workExperiences" :key="job.id" class="job-card">
        <div class="job-card-header">
          <ButtonCPN
            @click="removeJob(job.id)"
            class="btn btn-icon delete-btn"
            title="刪除此工作經歷"
          >
            <span class="material-symbols-outlined">delete</span>
          </ButtonCPN>
        </div>

        <div class="input-group">
          <label>職位名稱</label>
          <TextInput
            v-model="job.jobTitle"
            class="input-text"
            placeholder="例如：Senior Product Designer"
          />
        </div>

        <div class="input-group">
          <label>公司名稱</label>
          <TextInput
            v-model="job.jobCompany"
            class="input-text"
            placeholder="例如：TechCorp Inc."
          />
        </div>

        <div class="input-group-inline">
          <div class="input-group">
            <label>起始日期</label>
            <TextInput
              v-model="job.startDate"
              type="date"
              class="input-text"
              placeholder="例如：2021-10"
            />
          </div>
          <div class="input-group">
            <label>結束日期</label>
            <TextInput
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
              <TextInput
                v-model="resp.text"
                type="textarea"
                :rows="3"
                resize="vertical"
              />

              <ButtonCPN
                @click="removeResponsibility(job, resp.id)"
                variant="secondary"
                size="small"
                class="delete-resp-btn"
              >
                <template #icon>
                  <span class="material-symbols-outlined">close</span>
                </template>
              </ButtonCPN>
            </li>
          </ul>

          <div class="resp-list">
            <TextInput
              v-model="job.newResponsibilityText"
              type="textarea"
              :rows="5"
              resize="vertical"
              placeholder="新增一個職責描述..."
              :block="true"
            />

            <div class="add-btn-wrapper">
              <ButtonCPN
                @click="addResponsibility(job)"
                variant="secondary"
              >
                新增
              </ButtonCPN>
            </div>
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
  /* 保持管理區塊與父容器一致 */
  background-color: var(--color-background-mute);
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



/* 工作卡片樣式 */
.job-card {
  border: 1px solid var(--card-border);
  background-color: var(--resume-card-bg);
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
  align-items: flex-start; /* 讓 textarea 靠上對齊 */
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
  color: var(--vt-c-text-light-2);
  padding: 3px;
}

.delete-resp-btn:hover {
  color: var(--brand-pink);
}

.add-resp-group {
  display: flex;
  /* 將 flex-direction 改為 column，讓 textarea 在上方，按鈕在下方 */
  flex-direction: column;
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
