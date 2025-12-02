<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// 1.從父層接收資料
defineProps<{ //Vue 3 的巨集 (Macro)
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
    <div
      class="select-trigger"
      :class="{ 'is-active' : isOpen }"
      @click="toggleDropdown"
    >
      <span v-if="modelValue">{{ modelValue }}</span>
      <span v-else class="placeholder">{{ placeholder || '請選擇...' }}</span>

      <span class="material-symbols-outlined arrow-icon">
        {{ isOpen ? 'expand_less' : 'expand_more' }}
      </span>
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
          {{ option }}

          <span v-if="option === modelValue" class="material-symbols-outlined check-icon">
            check
          </span>
        </li>
      </ul>
    </transition>
  </div>
</template>
