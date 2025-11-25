<script setup lang="ts">
import { ref } from 'vue'

// ------------------------------------
// 假設的數據結構 (模擬從 API 獲取的原始數據)
// ------------------------------------
interface BulletItem {
  id: number
  text: string
  isEditing: boolean
}

interface AboutMeData {
  paragraph: string
  bullets: BulletItem[]
}

// 模擬的初始數據 (從您圖片中提取)
const initialAboutMe: AboutMeData = {
  paragraph:
    "I'm a passionate product designer with over 8 years of experience creating user-centered digital experiences. My work focuses on bridging the gap between user needs and business goals through thoughtful design solutions. I believe in the power of collaboration, accessibility, and continuous learning to create products that truly make a difference.",
  bullets: [
    {
      id: 1,
      text: 'Specialized in design systems, user research, and cross-functional collaboration',
      isEditing: false,
    },
    {
      id: 2,
      text: 'Strong advocate for accessibility and inclusive design practices',
      isEditing: false,
    },
    {
      id: 3,
      text: 'Experienced in leading design teams and mentoring junior designers',
      isEditing: false,
    },
  ],
}

// ------------------------------------
// 響應式狀態 (用於編輯)
// ------------------------------------
const editableAbout = ref<AboutMeData>(JSON.parse(JSON.stringify(initialAboutMe))) // 深拷貝以確保數據獨立
const newItemText = ref('')

// ------------------------------------
// 方法
// ------------------------------------

// 新增項目
const addNewItem = () => {
  if (newItemText.value.trim() === '') return

  // ID 生成邏輯 （三元運算式 [條件判斷] ? [條件為真時的值] : [條件為假時的值]）
  const newId =
    editableAbout.value.bullets.length > 0 //是否大於0
      ? Math.max(...editableAbout.value.bullets.map((b) => b.id)) + 1 //找到最大ID並+1
      : 1

  editableAbout.value.bullets.push({
    id: newId,
    text: newItemText.value.trim(),
    isEditing: false,
  })

  newItemText.value = '' // 清空輸入框
}

// 刪除項目
const deleteItem = (id: number) => {
  editableAbout.value.bullets = editableAbout.value.bullets.filter((item) => item.id !== id)
}

// 儲存所有變更 (模擬 API 提交)
const saveAllChanges = () => {
  console.log('正在儲存 About Me 的變更...', editableAbout.value)
  // 這裡應放置實際的 API 呼叫邏輯
  alert('變更已儲存 (模擬)')
  // 儲存後，可以將 editableAbout 重新設為新的 initialAboutMe (實際應用中應從 API 重新獲取或同步)
}
</script>

<template>
  <div class="admin-block about-me-admin">
    <h2 class="admin-title">關於我管理</h2>

    <div class="paragraph-edit-section">
      <h3>About me</h3>
      <textarea
        v-model="editableAbout.paragraph"
        rows="5"
        class="input-textarea"
        placeholder="請輸入關於您的段落內容..."
      ></textarea>
    </div>

    <div class="divider"></div>

    <div class="list-management-section">
      <h3>項目列表管理</h3>

      <div class="add-item-form">
        <input
          v-model="newItemText"
          placeholder="新增一個自己的特色項目 (例如：自信、勇於提問...)"
          class="input-text"
        />
        <button @click="addNewItem" class="add-btn">
          <span class="icon-symbol">add_circle</span>
          新增項目
        </button>
      </div>

      <ul class="bullet-list-admin">
        <li v-for="item in editableAbout.bullets" :key="item.id" class="bullet-item-admin">
          <div class="item-content-wrapper">
            <input v-if="item.isEditing" v-model="item.text" class="input-text item-edit-input" />
            <span v-else class="item-text">{{ item.text }}</span>
          </div>

          <div class="item-actions">
            <button
              v-if="!item.isEditing"
              @click="item.isEditing = true"
              class="edit-btn"
              title="編輯"
            >
              <span class="material-symbols-outlined icon-symbol">edit</span>
            </button>
            <button v-else @click="item.isEditing = false" class="save-btn" title="儲存">
              <span class="material-symbols-outlined icon-symbol">save</span>
            </button>
            <button @click="deleteItem(item.id)" class="delete-btn" title="刪除">
              <span class="material-symbols-outlined icon-symbol">delete</span>
            </button>
          </div>
        </li>
      </ul>
    </div>

    <div class="save-section">
      <button @click="saveAllChanges" class="save-btn large-save-btn">
        <span class="material-symbols-outlined icon-symbol">cloud_upload</span> 儲存所有變更
      </button>
    </div>
  </div>
</template>

<style scoped>

/* ==================================== */
/* 通用管理樣式 (基於您之前的 CSS 習慣) */
/* ==================================== */

.admin-title {
  color: var(--name-color);
  font-size: 2rem;
  border-bottom: 2px solid var(--icon-box-bg);
  padding-bottom: 0.5rem;
  margin-bottom: 1.5rem;
}

.divider {
  border: none;
  border-top: 1px solid var(--icon-box-bg);
  margin: 1.5rem 0;
}

/* 按鈕基礎樣式 */
.edit-btn,
.save-btn,
.delete-btn,
.add-btn {
  padding: 0.6rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
  transition: background-color 0.2s;
  font-size: 1rem;
  white-space: nowrap; /* 防止按鈕文字換行 */
}

.edit-btn {
  background-color: var(--icon-box-bg);
  color: var(--name-color);
}
.save-btn {
  background-color: #4caf50;
  color: white;
} /* Green */
.delete-btn {
  background-color: #f44336;
  color: white;
} /* Red */
.add-btn {
  background-color: var(--name-color);
  color: white;
}

.edit-btn .icon-symbol,
.save-btn .icon-symbol,
.delete-btn .icon-symbol,
.add-btn .icon-symbol {
  font-size: 1.25rem;
}

/* 大型儲存按鈕 */
.save-section {
  margin-top: 2rem;
  text-align: center;
}
.large-save-btn {
  padding: 0.75rem 1.5rem;
  font-size: 1.1rem;
}

/* ==================================== */
/* 輸入框通用樣式 */
/* ==================================== */

.input-textarea,
.input-text {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid var(--icon-box-bg);
  border-radius: 4px;
  background-color: var(--resume-card-bg, white);
  color: var(--color-text);
  font-size: 1rem;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
  resize: vertical; /* 允許垂直拖拉大小 */
}

.input-textarea:hover,
.input-text:hover {
  border-color: var(--name-color);
}

.input-textarea:focus,
.input-text:focus {
  border-color: var(--name-color);
  box-shadow: 0 0 0 1px var(--name-color);
  outline: none;
}

/* ==================================== */
/* 列表管理特定樣式 */
/* ==================================== */

.paragraph-edit-section h3,
.list-management-section h3 {
  font-size: 1.25rem;
  color: var(--color-text);
  margin-top: 0;
  margin-bottom: 0.5rem;
}

/* 新增項目表單 */
.add-item-form {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

/* 項目列表容器 */
.bullet-list-admin {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* 列表單一項目 */
.bullet-item-admin {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: var(--icon-box-bg); /* 淺米色背景 */
  border-left: 4px solid var(--title-color); /* 粉色左邊框 */
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.item-content-wrapper {
  flex-grow: 1;
}

.item-text {
  color: var(--color-text);
  line-height: 1.5;
  display: block; /* 讓 span 佔滿空間 */
}

/* 列表項目編輯輸入框 */
.item-edit-input {
  padding: 0.5rem 0.75rem; /* 編輯狀態時的小 padding */
  font-size: 1rem;
  /* 覆蓋通用樣式，移除背景和邊框，使其融入 item-admin 背景 */
  border: 1px solid var(--name-color);
  background-color: white;
}

/* 動作按鈕群組 */
.item-actions {
  display: flex;
  gap: 0.5rem;
  flex-shrink: 0;
}
</style>
