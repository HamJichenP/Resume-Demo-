<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// 1.從父層接收資料
defineProps<{
  //Vue 3 的巨集 (Macro)
  // 雙向綁定選中的值
  modelValue: string | number | null

  // 父層傳入的選項清單資料
  options: string[]

  // 提示文字
  placeholder?: string
}>()

// 2.定義發送事件
const emit = defineEmits<{
  // 事件名稱：update:modelValue
  // vlalue typee string | number
  (e: 'update:modelValue', value: string | number): void
}>()

// 3.管理下拉選單開關狀態
const isOpen = ref(false)
const containerRef = ref<HTMLElement | null>(null)

// === 動作邏輯 ===
const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const selectOption = (option: string) => {
  // 更新父層數據
  emit('update:modelValue', option)
  // 關閉選單
  isOpen.value = false
}

// 點擊外部自動關閉 (Click Outside)
const handleClickOutside = (event: MouseEvent) => {
  if (containerRef.value && !containerRef.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

// 整個網頁 (document)
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div ref="containerRef" class="admin-select">
    <div @click="toggleDropdown">
      <!-- 使用插槽 slot -->
      <slot name="trigger" :modelValue="modelValue" :isOpen="isOpen">
        <div class="select-trigger" :class="{ 'is-active': isOpen }">
          <span v-if="modelValue">{{ modelValue }}</span>
          <span v-else class="placeholder">{{ placeholder || '請選擇...' }}</span>
          <span class="material-symbols-outlined arrow-icon">
            {{ isOpen ? 'expand_less' : 'expand_more' }}
          </span>
        </div>
      </slot>
    </div>

    <transition name="fade">
      <ul v-if="isOpen" class="options-list">
        <li
          v-for="(option, index) in options"
          :key="index"
          class="option-item"
          :class="{ 'is-selected': option === modelValue }"
          @click="selectOption(option)"
        >
          <slot name="option" :option="option">{{ option }}</slot>

          <span v-if="option === modelValue" class="material-symbols-outlined check-icon">
            check
          </span>
        </li>
      </ul>
    </transition>
  </div>
</template>
<style scoped>
/* 1. 下拉清單容器 */
.options-list {
 

  margin-top: 4px;
  padding: 0; /* 移除內距 */

  /* ✨ 關鍵修改：移除 li 前面的點點 */
  list-style: none;

  background-color: var(--resume-card-bg, white);
  border: 1px solid var(--name-color);
  border-radius: 4px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  max-height: 250px;
  overflow-y: auto;
}

/* 2. 單個選項 */
.option-item {
  padding: 0.6rem 0.75rem;
  cursor: pointer;

  /* ✨ 關鍵修改：讓內容橫向排列 (Flexbox) */
  display: flex;

  /* ✨ 關鍵修改：讓文字在左，打勾在右 */
  justify-content: space-between;
  align-items: center;

  transition: background-color 0.2s;
  color: var(--color-text);
}

.option-item:hover {
  background-color: var(--icon-box-bg);
}

.option-item.is-selected {
  background-color: var(--icon-box-bg);
  font-weight: 600;
  color: var(--name-color);
}

.check-icon {
  font-size: 1rem;
  /* 確保打勾不會緊貼文字，雖然 space-between 已經推開了 */
  margin-left: 0.5rem;
}

/* ... 其他樣式保持不變 ... */
</style>
