<script setup lang="ts">
import { ref } from 'vue'

// 1. UI 元件引入
import PhotoInput from '@/components/Component Library/Resume_Back/PhotoInput.vue'
import TextInput from '@/components/Component Library/Resume_Back/TextInput.vue'
import DropdownMenu from '@/components/Component Library/Resume_Back/DropdownMenu.vue' // 注意路徑用 @
import ButtonPrimary from '@/components/Component Library/Resume_Back/ButtonCPN.vue'

// 2. 邏輯引入 (Composables)
// 請確認你的檔案路徑和 export 名稱是否正確！
import { useContacts } from '@/components/Component Library/Funtion/useContacts'
import { useIconPicker } from '@/components/Component Library/Funtion/useIcon' // 假設你改好 export 名稱了

// === 狀態與邏輯 ===

// A. 圖片上傳邏輯
const userAvatar = ref('') // 這是「初始值」

const AvatarUpdate = (file: File | null) => {
  if (file) {
    // 這裡只要負責「準備上傳」，不用去改 userAvatar.value
    console.log('準備上傳:', file)
    // uploadToBackend(file) ...
  }
}

// B. 聯絡人邏輯 (直接使用 useContacts，不要再手寫 ref 了！)
const { contacts, newContact, addContact, deleteContact, toggleEdit, saveChanges } = useContacts()

// C. Icon 邏輯
const { iconSearchQuery, filteredIcons, getIcon } = useIconPicker()

// E. 姓名編輯邏輯 (這部分比較簡單，留在這裡沒問題)
const userName = ref('Jack ChenP')
const userTitle = ref('陳柏瑋')
const isNameEditing = ref(false)
</script>

<template>
  <h2 class="admin-page-title">聯絡資訊管理</h2>

  <div class="top-section">
    <div class="photo-edit-section">
      <PhotoInput :avatar="userAvatar" @update:avatar="AvatarUpdate" />
    </div>

    <div class="name-edit-section">
      <div v-if="!isNameEditing" class="display-mode">
        <h1 class="contact-name-admin">{{ userName }}</h1>
        <p class="contact-title-admin">{{ userTitle }}</p>

        <ButtonPrimary variant="success" @click="isNameEditing = true">
          <span class="material-symbols-outlined icon-symbol">edit</span>
          編輯姓名
        </ButtonPrimary>
      </div>

      <div v-else class="edit-mode">
        <TextInput v-model="userName" label="姓名" />
        <TextInput v-model="userTitle" label="標題" />

        <ButtonPrimary variant="success" @click="isNameEditing = false">
          <span class="material-symbols-outlined icon-symbol">save</span>
          儲存變更
        </ButtonPrimary>
      </div>
    </div>
  </div>

  <hr class="divider" />

  <div class="contact-list-admin">
    <h3>聯絡項目列表</h3>

    <div v-for="contact in contacts" :key="contact.id" class="contact-item-admin">
      <div class="item-display">
        <component :is="getIcon(contact.icon)" class="icon-box">
          <span v-if="contact.icon !== 'github'" class="material-symbols-outlined icon-symbol">{{
            contact.icon
          }}</span>
        </component>

        <div class="item-details">
          <span class="item-type">{{ contact.type }}:</span>

          <TextInput v-if="contact.isEditing" v-model="contact.value" class="input-value" />
          <span v-else class="item-value">{{ contact.value }}</span>
        </div>
      </div>

      <div class="item-actions">
        <ButtonPrimary
          :variant="contact.isEditing ? 'success' : 'secondary'"
          @click="contact.isEditing ? saveChanges(contact) : toggleEdit(contact)"
        >
          <span class="material-symbols-outlined icon-symbol">
            {{ contact.isEditing ? 'save' : 'edit' }}
          </span>
        </ButtonPrimary>

        <ButtonPrimary variant="danger" @click="deleteContact(contact.id)">
          <span class="material-symbols-outlined icon-symbol">delete</span>
        </ButtonPrimary>
      </div>
    </div>
  </div>

  <div class="add-contact-form">
    <h3>新增聯絡項目</h3>
    <div class="form-inputs">
      <DropdownMenu v-model="newContact.icon" :options="filteredIcons" class="icon-select-wrapper">
        <template #trigger="{ isOpen }">
          <div class="selected-icon-display">
            <component :is="getIcon(newContact.icon)" class="icon-box">
              <span
                v-if="newContact.icon !== 'github'"
                class="material-symbols-outlined icon-symbol"
              >
                {{ newContact.icon }}
              </span>
            </component>

            <TextInput
              v-model="iconSearchQuery"
              placeholder="搜尋 Icon"
              class="icon-search-input"
              @click.stop
            />

            <span class="material-symbols-outlined dropdown-arrow">
              {{ isOpen ? 'expand_less' : 'expand_more' }}
            </span>
          </div>
        </template>

        <template #option="{ option }">
          <div class="custom-option">
            <component :is="getIcon(option)" class="icon-preview small">
              <span v-if="option !== 'github'" class="material-symbols-outlined icon-symbol">
                {{ option }}
              </span>
            </component>

            <span class="icon-name-text">{{ option }}</span>
          </div>
        </template>
      </DropdownMenu>

      <TextInput v-model="newContact.type" placeholder="聯絡項目" class="input-value" />

      <TextInput v-model="newContact.value" placeholder="通訊資訊" class="input-value" />

      <ButtonPrimary @click="addContact">
        <span class="material-symbols-outlined icon-symbol">add_circle</span> 新增
      </ButtonPrimary>
    </div>
  </div>
</template>

<style scoped>
/* === 1. 頁面基礎排版 === */
.admin-page-title {
  color: var(--name-color);
  font-size: 3rem;
  border-bottom: 2px solid var(--icon-box-bg);
  margin-bottom: 2rem;
}

.divider {
  border: none;
  border-top: 1px solid var(--icon-box-bg);
  margin: 2rem 0;
}

/* === ✨ 2. 頂部區域 (Top Section) - 參考你的紅框截圖 === */
.top-section {
  display: flex; /* 開啟 Flex 讓照片跟名字並排 */
  align-items: center; /* 垂直置中 */
  gap: 2.5rem; /* 照片與名字之間的距離 */

  margin-bottom: 2rem;

  /* 如果希望寬度佔滿 */
  width: 100%;
}

/* 左邊的照片 */
.photo-edit-section {
  flex-shrink: 0; /* 固定大小 */
}

/* 中間的名字區塊 */
.name-edit-section {
  flex-grow: 0; /* 不要撐開，只佔據需要的空間 */
  min-width: 300px; /* 給個最小寬度，避免編輯時太窄 */
}

/* --- 名字顯示模式 --- */
.display-mode {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
}

.contact-name-admin {
  color: var(--name-color);
  font-size: 2.5rem;
  font-weight: 700; /* 加粗更有份量 */
  margin: 0;
  line-height: 1.2;
}

.contact-title-admin {
  color: var(--title-color);
  font-size: 1.5rem;
  font-weight: 500;
  margin: 0;
  margin-bottom: 1rem; /* 名字跟按鈕之間的距離 */
}

/* --- 名字編輯模式 --- */
.edit-mode {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  width: 100%;
}

/* 強制讓編輯框寬度固定 */
.edit-mode :deep(.admin-input) {
  width: 100%;
  max-width: 400px;
}

/* 針對編輯模式下的 TextInput */
.edit-mode :deep(.admin-input) {
  /* 1. 背景與邊框優化 */
  background-color: var(--icon-box-bg); /* 半透明白，讓它融入米色背景 */
  border: 1px solid transparent; /* 平常隱藏邊框 */
  border-radius: 8px;

  /* 3. 文字與空間 */
  padding: 0.8rem 1rem; /* 加大內距 */
  font-size: 1.1rem;
  color: var(--color-text);

  /* 過渡動畫 */
  transition: all 0.2s ease;
}

/* 4. 滑鼠移過去 (Hover) */
.edit-mode :deep(.admin-input:hover) {
  background-color: var(--vt-c-white);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
}

/* 5. 點擊輸入時 (Focus) */
.edit-mode :deep(.admin-input:focus) {
  background-color: var(--vt-c-white);
  border-color: var(--name-color); /* 聚焦時才顯示橘色邊框 */
  box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.1); /* 橘色光暈 */
  outline: none;
}

/* 讓兩個輸入框之間有點距離 */
.edit-mode {
  gap: 1rem; /* 原本可能是 0.5rem，加大一點 */
}
/* === 3. 聯絡項目列表 (Layout) === */
.contact-list-admin {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.contact-item-admin {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--icon-box-bg);
}

.item-display {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.icon-box {
  width: 3rem;
  height: 3rem;
  border-radius: 0.5rem; /* 統一圓角 */
  background-color: var(--icon-box-bg);
  color: var(--icon-box-fg);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-right: 0.5rem;
}

.icon-box .icon-symbol {
  font-size: 1.5rem;
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

.contact-item-admin .input-value {
  min-width: 250px;
}

.item-actions {
  display: flex;
  gap: 0.5rem;
}

/* === 4. 新增表單區 (Grid Layout) === */
.add-contact-form {
  border-radius: 4px;
}

.form-inputs {
  display: grid;
  /* 比例設定 */
  grid-template-columns: 1.2fr 1fr 2fr auto;
  gap: 1rem;
  align-items: center; /* 垂直置中 */
}

/* === 關鍵優化：強制統一該區塊內所有元件的高度 === */
/* 使用 :deep 穿透，確保 Input, Dropdown, Button 一樣高 */
.form-inputs :deep(.admin-input),
.form-inputs :deep(.select-trigger),
.form-inputs :deep(.admin-btn) {
  height: 3rem; /* 統一高度約 48px */
  padding: 0 1rem; /* 統一左右內距 */
  font-size: 1.1rem;
  display: flex; /* 確保內容垂直置中 */
  align-items: center;
}

/* === 5. Dropdown 插槽內容樣式 (Slot Styling) === */

/* A. 容器與觸發區 */
.icon-select-wrapper {
  width: 100%;
  height: 100%; /* 跟隨 Grid 高度 */
}

.selected-icon-display {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%; /* 撐滿 Dropdown 內部 */
}

/* B. Icon 預覽方塊 (觸發區用) */
.icon-preview {
  width: 2.2rem; /* 稍微縮小以塞進 3rem 高度 */
  height: 2.2rem;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-right: 0.5rem;
}

.icon-preview .icon-symbol {
  font-size: 2rem;
}

/* C. 隱形搜尋框 (讓它融入 Dropdown) */
.icon-search-input {
  border: none !important;
  background: transparent !important;
  box-shadow: none !important;
  padding: 0 !important;
  flex-grow: 1;
  height: 100% !important; /* 確保點擊範圍夠大 */
}

/* D. 下拉箭頭 */
.dropdown-arrow {
  margin-left: auto;
  color: var(--color-text-mute);
}

/* === 6. 下拉清單內容樣式 (Option Slot) === */

/* 每一行的排版 */
.custom-option {
  display: flex;
  align-items: center;
  width: 100%;
}

/* 選項裡的 Icon 方塊 (可以比上面的稍微小一點或一樣) */
.icon-preview.small {
  width: 2rem;
  height: 2rem;
  margin-right: 0.8rem;
}

.icon-name-text {
  font-size: 1rem;
  color: var(--color-text);
  flex-grow: 1;
}
</style>
