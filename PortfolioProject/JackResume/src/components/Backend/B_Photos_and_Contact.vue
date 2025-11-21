<script setup lang="ts">
import { ref } from 'vue'
import GithubIcon from '@/assets/GithubIcon.vue'
// 引入 Material Symbols，需要確保應用程式中已正確安裝
// import { AddIcon, DeleteIcon, EditIcon, SaveIcon } from 'material-design-icons-vue3';

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
  { id: 1, icon: 'Mail', type: 'Email', value: 'john.anderson@email.com', isEditing: false },
  { id: 2, icon: 'Call', type: 'Phone', value: '+1 (555) 123-4567', isEditing: false },
  { id: 3, icon: 'Home_Pin', type: 'Location', value: 'San Francisco, CA', isEditing: false },
  { id: 4, icon: 'github', type: 'GitHub', value: 'github.com/johnanderson', isEditing: false },
])

const newContact = ref<Omit<ContactItem, 'id' | 'isEditing'>>({
  icon: 'Add', // 新增時的預設 Icon
  type: '',
  value: '',
})

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

// 取得 Icon Component/Symbol
const getIcon = (iconName: string) => {
  return iconName === 'github' ? GithubIcon : 'span'
}

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
      <input
        v-model="newContact.icon"
        placeholder="Icon 名稱 (e.g., Mail, Call, github)"
        class="input-icon"
      />
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
/*管理頁面基礎樣式*/

.admin-page-title {
  color: var(--name-color);
  font-size: 2rem;
  margin-bottom: 2rem;
  border-bottom: 2px solid var(--icon-box-bg);
  padding-bottom: 1rem;
}

.divider {
  border: none;
  border-top: 1px solid var(--icon-box-bg);
  margin: 1.5rem 0;
}

/*姓名與標題編輯區*/
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

.input-name,
.input-title {
  padding: 0.5rem;
  border: 1px solid var(--icon-box-bg);
  border-radius: 4px;
  font-size: 1.2rem;
}

/*按鈕基礎樣式*/
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

/*聯絡資訊列表管理*/
.contact-list-admin {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
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
  /* 沿用原本的 Icon 樣式 */
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
.input-value {
  padding: 0.4rem;
  border: 1px solid var(--name-color);
  border-radius: 4px;
  font-size: 1.1rem;
  min-width: 250px;
}

.item-actions {
  display: flex;
  gap: 0.5rem;
}

/*新增項目表單*/
.add-contact-form {
  margin-top: 1rem;
}

.form-inputs {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr 1fr;
  gap: 1rem;
  align-items: center;
}

.input-type,
.input-value,
.input-icon {
  padding: 1rem;
  border: 1px solid var(--icon-box-bg);
  border-radius: 4px;
  font-size: 1rem;
}

</style>
