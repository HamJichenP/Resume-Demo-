<script setup lang="ts">
import { ref } from 'vue'

// 預設初始圖片(avatar沒資料時)，avatar有資料時即時更新
const props = withDefaults(
  defineProps<{
    avatar?: string
  }>(),
  { avatar: 'https://via.placeholder.com/150' },
)

// 狀態管理
const previewAvatar = ref(props.avatar)
// 從 html 抓取 input 元素
const fileInputRef = ref<HTMLInputElement | null>(null)

// 為了讓父層(引用這個元件的HTML)可以拿到檔案，我們可以用 defineExpose 或是 emit
const emit = defineEmits<{
  (e: 'update:avatar', file: File | null): void
}>()

// 事件處發(click 滑鼠點擊)
const triggerFileInput = () => {
  fileInputRef.value?.click()
}

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement //確定目標是 input 元素
  // 確認有檔案被選取
  if (target.files && target.files[0]) {
    const file = target.files[0]

    // 1. 更新預覽圖片
    const previewurl = URL.createObjectURL(file)
    previewAvatar.value = previewurl

    // 2. 發送檔案給父層
    emit('update:avatar', file)
  }
}
</script>

<template>
  <div class="photo-edit-wrapper" @click="triggerFileInput">
    <img :src="previewAvatar" alt="User Avatar" class="profile-photo" />

    <div class="photo-overlay">
      <span class="material-symbols-outlined icon-camera">photo_camera</span>
      <span class="edit-text">更換照片</span>
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
