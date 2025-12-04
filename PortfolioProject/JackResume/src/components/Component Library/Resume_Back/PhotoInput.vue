<script setup lang="ts">
import { ref, computed, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    avatar?: string
  }>(),
  {
    avatar: '', // 預設為空字串，這樣一開始才會顯示 SVG
  },
)

const emit = defineEmits<{
  (e: 'update:avatar', file: File | null): void
}>()

// === 狀態管理 ===
const previewAvatar = ref(props.avatar)
const fileInputRef = ref<HTMLInputElement | null>(null)

// 🔍 關鍵邏輯：判斷「現在有沒有照片？」
// 如果 previewAvatar 有值 (網址)，就是 true；否則就是 false
const hasImage = computed(
  () => !!previewAvatar.value && previewAvatar.value !== 'https://via.placeholder.com/150',
)

// (選用) 監聽 props 變化 (如果父層改了圖片，子層也要更新)
watch(
  () => props.avatar,
  (newVal) => {
    previewAvatar.value = newVal
  },
)

// === 動作邏輯 ===
const triggerFileInput = () => {
  fileInputRef.value?.click()
}

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    const file = target.files[0]

    // 1. 產生預覽網址 -> 畫面會變
    previewAvatar.value = URL.createObjectURL(file)

    // 2. 通知父層 -> 傳送檔案
    emit('update:avatar', file)
  }
}
</script>

<template>
  <div class="photo-edit-wrapper" @click="triggerFileInput">
    <img v-if="hasImage" :src="previewAvatar" alt="User Avatar" class="profile-photo" />

    <div v-else class="svg-placeholder">
      <svg
        width="64"
        height="64"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="32" cy="32" r="32" fill="#F97316" />
        <path
          d="M42 22H38L36 19H28L26 22H22C19.79 22 18 23.79 18 26V40C18 42.21 19.79 44 22 44H42C44.21 44 46 42.21 46 40V26C46 23.79 44.21 22 42 22ZM32 39C29.24 39 27 36.76 27 34C27 31.24 29.24 29 32 29C34.76 29 37 31.24 37 34C37 36.76 34.76 39 32 39Z"
          fill="white"
        />
      </svg>
      <span class="upload-text">上傳照片</span>
    </div>

    <input
      ref="fileInputRef"
      type="file"
      accept="image/png, image/jpeg, image/jpg"
      hidden
      @change="handleFileChange"
    />
  </div>
</template>

<style scoped>
.photo-edit-wrapper {
  position: relative;
  width: 10rem; /* 設定圓圈大小 */
  height: 10rem;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;

  /* 預設底色 */
  background-color: var(--resume-card-bg);
  border: 5px dashed var(--icon-box-bg); /* 虛線邊框增加質感 */

  display: flex;
  align-items: center;
  justify-content: center;

  transition: all 0.2s ease;
}

.photo-edit-wrapper:hover {
  border-color: var(--name-color);
  background-color: var(--icon-box-bg);
}

/* 照片樣式 */
.profile-photo {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 關鍵：填滿不變形 */
}

/* SVG 區塊樣式 */
.svg-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.upload-text {
  font-size: 0.9rem;
  color: var(--name-color); /* 跟 SVG 的橘色呼應 */
  font-weight: 500;
}
</style>
