<script setup lang="ts">
// 定義接收的資料 (Props)
defineProps<{
  // 接收父層傳來的值
  modelValue: string | number

  // 顯示的提示文字
  placeholder?: string

  // 輸入類型 (text, number, email...)，預設 text
  type?: string

  // 是否為全寬模式 (預設 false)
  block?: boolean
}>()

// 定義發送的事件 (Emits)
const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
}>()

// 處理輸入事件，回傳值給父層
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <input
    :type="type || 'text'"
    :value="modelValue"
    :placeholder="placeholder"
    class="admin-input"
    :class="{ 'is-block': block }"
    @input="handleInput"
  />
</template>
