<script setup lang="ts">
import { ref, computed } from 'vue'
import GithubIcon from '@/assets/icons/GithubIcon.vue'
import InstagramIcon from '@/assets/icons/InstagramIcon.vue'

// 聯絡項目接口 (Interface for Contact Item)
interface ContactItem {
  id: number
  icon: string // Material Symbol 名字或 'github'
  type: string
  value: string
  isEditing: boolean
}

// 靜態資料轉換為響應式數據
const contacts = ref<ContactItem[]>([
  { id: 1, icon: 'mail', type: 'Email', value: 'john.anderson@email.com', isEditing: false },
  { id: 2, icon: 'call', type: 'Phone', value: '+1 (555) 123-4567', isEditing: false },
  { id: 3, icon: 'home_pin', type: 'Location', value: 'San Francisco, CA', isEditing: false },
  { id: 4, icon: 'github', type: 'GitHub', value: 'github.com/johnanderson', isEditing: false },
])

const newContact = ref<Omit<ContactItem, 'id' | 'isEditing'>>({
  icon: 'mail', // 修正為小寫預設值
  type: '',
  value: '',
})

//#region (CRUD)

// 新增 (Create)
const addContact = () => {
  if (newContact.value.type && newContact.value.value) {
    const newId = contacts.value.length > 0 ? Math.max(...contacts.value.map((c) => c.id)) + 1 : 1
    contacts.value.push({
      id: newId,
      ...newContact.value,
      isEditing: false,
    })
    // 清空輸入欄位
    newContact.value = { icon: 'Add', type: '', value: '' }
  }
}

// 刪除 (Delete)
const deleteContact = (id: number) => {
  contacts.value = contacts.value.filter((c) => c.id !== id)
}

// 修改/更新 (Update) - 切換編輯狀態
const toggleEdit = (contact: ContactItem) => {
  contact.isEditing = !contact.isEditing
}

// 儲存修改 (Save)
const saveChanges = (contact: ContactItem) => {
  // 在這裡可以加入 API 呼叫，將變更儲存到後端
  // 假設儲存成功，關閉編輯模式
  contact.isEditing = false
}

//#endregion

//#region (Icon)

// Icon 清單：使用常用的 Material Symbols 小寫名稱
const iconList = ref(['mail', 'call', 'home_pin', 'github', 'link', 'instagram'])
iconList.value.sort()

// === Icon 搜尋/下拉選單邏輯 ===
const showIconDropdown = ref(false)
const iconSearchQuery = ref('') // 用於篩選的輸入，初始為空

// 計算屬性：根據輸入篩選 Icon 清單
const filteredIcons = computed(() => {
  const query = iconSearchQuery.value.toLowerCase()
  if (!query) {
    // 如果沒有輸入，只顯示前 10 個
    return iconList.value.slice(0, 10)
  }
  return iconList.value.filter((icon) => icon.includes(query))
})

// 選擇 Icon
const selectIcon = (iconName: string) => {
  newContact.value.icon = iconName
  iconSearchQuery.value = iconName // 讓輸入框顯示選中的名稱
  showIconDropdown.value = false
}

// 處理 Icon Component/Symbol (保持不變)
const getIcon = (iconName: string) => {
  if (iconName === 'github') {
    return GithubIcon
  } else if (iconName === 'instagram') {
    return InstagramIcon
  }
  // 如果都不是自定義組件，則返回 'span' 讓 Material Symbols 處理
  return 'span'
}
//#endregion

// 聯絡人姓名和標題現在也需要變成響應式數據以便編輯
const userName = ref('Jack ChenP')
const userTitle = ref('陳柏瑋')
const isNameEditing = ref(false)
</script>

<template>
  <h2 class="admin-page-title">聯絡資訊管理</h2>

  <div class="name-edit-section">
    <div v-if="!isNameEditing" class="display-mode">
      <h1 class="contact-name-admin">{{ userName }}</h1>
      <p class="contact-title-admin">{{ userTitle }}</p>
      <button @click="isNameEditing = true" class="edit-btn">
        <span class="material-symbols-outlined icon-symbol">edit</span> 編輯姓名
      </button>
    </div>
    <div v-else class="edit-mode">
      <input v-model="userName" class="input-name" placeholder="英文姓名" />
      <input v-model="userTitle" class="input-title" placeholder="中文姓名" />
      <button @click="isNameEditing = false" class="save-btn">
        <span class="material-symbols-outlined icon-symbol">save</span> 儲存
      </button>
    </div>
  </div>

  <hr class="divider" />

  <div class="contact-list-admin">
    <h3>聯絡項目列表</h3>
    <div v-for="contact in contacts" :key="contact.id" class="contact-item-admin">
      <div class="item-display">
        <component :is="getIcon(contact.icon)" class="edu-icon-admin">
          <span v-if="contact.icon !== 'github'" class="material-symbols-outlined icon-symbol">{{
            contact.icon
          }}</span>
        </component>

        <div class="item-details">
          <span v-if="!contact.isEditing" class="item-type">{{ contact.type }}:</span>

          <input v-if="contact.isEditing" v-model="contact.value" class="input-value" />
          <span v-else class="item-value">{{ contact.value }}</span>
        </div>
      </div>

      <div class="item-actions">
        <button
          @click="contact.isEditing ? saveChanges(contact) : toggleEdit(contact)"
          :class="contact.isEditing ? 'save-btn' : 'edit-btn'"
        >
          <span class="material-symbols-outlined icon-symbol">
            {{ contact.isEditing ? 'save' : 'edit' }}
          </span>
        </button>

        <button @click="deleteContact(contact.id)" class="delete-btn">
          <span class="material-symbols-outlined icon-symbol">delete</span>
        </button>
      </div>
    </div>
  </div>

  <hr class="divider" />

  <div class="add-contact-form">
    <h3>新增聯絡項目</h3>
    <div class="form-inputs">
      <div class="icon-select-wrapper">
        <div class="selected-icon-display" @click="showIconDropdown = !showIconDropdown">
          <component :is="getIcon(newContact.icon)" class="icon-preview">
            <span v-if="newContact.icon !== 'github'" class="material-symbols-outlined icon-symbol">
              {{ newContact.icon }}
            </span>
          </component>

          <input
            v-model="iconSearchQuery"
            @focus="showIconDropdown = true"
            placeholder="搜尋 Icon 名稱"
            class="icon-search-input"
          />

          <span class="material-symbols-outlined dropdown-arrow">
            {{ showIconDropdown ? 'expand_less' : 'expand_more' }}
          </span>
        </div>

        <ul v-if="showIconDropdown" class="icon-dropdown-list">
          <li
            v-for="iconName in filteredIcons"
            :key="iconName"
            @click="selectIcon(iconName)"
            class="icon-dropdown-item"
          >
            <component :is="getIcon(iconName)" class="icon-preview">
              <span v-if="iconName !== 'github'" class="material-symbols-outlined icon-symbol">
                {{ iconName }}
              </span>
            </component>
            <span class="icon-name-text">{{ iconName }}</span>
          </li>
        </ul>
      </div>
      <input
        v-model="newContact.type"
        placeholder="項目名稱 (e.g., Line, Phone)"
        class="input-type"
      />
      <input
        v-model="newContact.value"
        placeholder="項目值 (e.g., @lineid, 1234567)"
        class="input-value"
      />
      <button @click="addContact" class="add-btn">
        <span class="material-symbols-outlined icon-symbol">add_circle</span> 新增
      </button>
    </div>
  </div>
</template>

<style scoped>
/* 基礎樣式與版面 */

.admin-page-title {
  color: var(--name-color);
  font-size: 3rem;
  border-bottom: 2px solid var(--icon-box-bg);
}

.divider {
  border: none;
  border-top: 1px solid var(--icon-box-bg);
  margin: 0.5rem 0;
}

/* #region 姓名與標題編輯區 */

.name-edit-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.contact-name-admin {
  color: var(--name-color);
  font-size: 2.5rem;
  margin: 0;
}

.contact-title-admin {
  color: var(--title-color);
  font-size: 1.5rem;
  margin: 0;
}

.edit-mode,
.display-mode {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

/*
 * .input-name, .input-title 的基礎樣式已移至通用輸入框區塊
 * 這裡只保留其獨有的字體大小
 */
.input-name,
.input-title {
  font-size: 1.2rem;
}

/* #endregion */

/* #region 按鈕基礎樣式 */

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
}

.edit-btn .icon-symbol,
.save-btn .icon-symbol,
.delete-btn .icon-symbol,
.add-btn .icon-symbol {
  font-size: 1.25rem; /* 將 Icon 設為 1.25rem (約 20px) */
}

.edit-btn {
  background-color: var(--icon-box-bg);
  color: var(--name-color);
}
.save-btn {
  background-color: #4caf50; /* Green */
  color: white;
}
.delete-btn {
  background-color: #f44336; /* Red */
  color: white;
}
.add-btn {
  background-color: var(--name-color);
  color: white;
}

/* #endregion */

/* #region 聯絡資訊列表管理 */

.contact-list-admin {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-size: 20px;
}

.contact-item-admin {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0rem;
  border: none;
  border-radius: 0;
  border-bottom: 1px solid var(--icon-box-bg);
  transition: background-color 0.2s;
}

.contact-item-admin:last-child {
  border-bottom: none; /* 最後一個項目沒有底線 */
  padding-bottom: 0;
}
.contact-item-admin:hover {
  background-color: var(--icon-box-bg); /* 懸停時給予輕微背景提示 */
}

.item-display {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.edu-icon-admin {
  width: 3rem;
  height: 3rem;
  border-radius: 0.5rem;
  background-color: var(--icon-box-bg);
  color: var(--icon-box-fg);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.edu-icon-admin .icon-symbol {
  font-size: 3rem;
}

.item-details {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}
.item-type {
  font-weight: 600;
  color: var(--name-color);
}
.item-value {
  font-size: 1.1rem;
}

/* 聯絡項目編輯區的 input-value */
.contact-item-admin .input-value {
  font-size: 1.1rem;
  min-width: 250px;
}

.item-actions {
  display: flex;
  gap: 0.5rem;
}
/* #endregion

/* 新增項目表單 */

/* #region 通用輸入框與互動樣式 (統一風格) */
.add-contact-form {
  margin-top: 1rem;
  font-size: 1rem;
}

.form-inputs {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr 1fr; /* 1 (Icon) 2 (Value) 1 (Type) 1 (Button) */
  gap: 1rem;
  align-items: center;
}

/*
 * .input-type 和 .input-value 的基礎樣式已移至通用輸入框區塊
 * 這裡只保留其獨有的字體大小
 */
.input-type,
.add-contact-form .input-value {
  font-size: 1rem;
}
/* #endregion */

/* #region 涵蓋所有需要統一邊框、背景和圓角的元素*/

.input-name,
.input-title,
.input-type,
.add-contact-form .input-value,
.contact-item-admin .input-value,
.selected-icon-display {
  /* 統一基礎樣式 */
  background-color: var(--resume-card-bg, white);
  border: 1px solid var(--icon-box-bg);
  border-radius: 4px;
  color: var(--color-text);
  /* 統一 padding 以確保高度一致 */
  padding: 0.5rem 0.75rem;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
}

/* Hover 互動：滑鼠懸停時邊框變色 */
.input-name:hover,
.input-title:hover,
.input-type:hover,
.add-contact-form .input-value:hover,
.contact-item-admin .input-value:hover,
.selected-icon-display:hover {
  border-color: var(--name-color);
}

/* Focus 互動：輸入框被點擊時，邊框變色並有輕微陰影 */
.input-name:focus,
.input-title:focus,
.input-type:focus,
.add-contact-form .input-value:focus,
.contact-item-admin .input-value:focus,
.icon-search-input:focus {
  border-color: var(--name-color);
  box-shadow: 0 0 0 1px var(--name-color);
  outline: none;
}

/* #endregion */

/* #region Icon 選擇器與下拉列表 */

.icon-select-wrapper {
  position: relative;
  width: 100%;
}

.selected-icon-display {
  display: flex;
  align-items: center;
  cursor: pointer;
  /* padding, border, radius 已由通用樣式區塊設定 */
}

/* Icon 搜尋輸入框 (它在 .selected-icon-display 內部，必須無邊框且透明) */
.icon-search-input {
  flex-grow: 1;
  border: none; /* 移除邊框 */
  outline: none;
  background: transparent; /* 背景透明 */
  padding: 0; /* 移除 padding */
  color: var(--color-text);
  font-size: 1rem;
}

.icon-preview {
  width: 2rem;
  height: 2rem;
  border-radius: 4px;
  background-color: var(--icon-box-bg);
  color: var(--icon-box-fg);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-right: 0.5rem;
}
.icon-preview .icon-symbol {
  font-size: 1.1rem;
}

.dropdown-arrow {
  margin-left: auto;
  color: var(--color-text-mute);
  font-size: 1.2rem;
}

/* Icon 下拉列表 */
.icon-dropdown-list {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 10;
  max-height: 200px;
  overflow-y: auto;
  list-style: none;
  padding: 0;
  margin: 0.25rem 0 0 0;
  background-color: var(--resume-card-bg);
  border: 1px solid var(--name-color);
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.icon-dropdown-item {
  display: flex;
  align-items: center;
  padding: 0.5rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.icon-dropdown-item:hover {
  background-color: var(--icon-box-bg);
}

.icon-name-text {
  margin-left: 0.5rem;
  font-size: 0.9rem;
}

/* #endregion */
</style>
