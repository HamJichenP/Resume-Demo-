<script setup lang="ts">
// 定義接收的資料 (Props)
defineProps<{
  // 接收父層傳來的值
  modelValue: string | number

  // 顯示的提示文字
  placeholder?: string

  // 輸入類型：決定是 'text' (單行) 還是 'textarea' (多行)
  // 如果父層沒傳，預設就是 'text'
  type?: string

  // 是否為全寬模式 (預設 false)
  block?: boolean

  // 控制多行的高度 (只有 type="textarea" 時有效)
  rows?: number

  // 控制 textarea 的調整大小行為 (只有 type="textarea" 時有效)
  resize?: 'none' | 'vertical' | 'horizontal' | 'both'
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
  <!-- 只有 textarea 才綁定 resize 樣式 -->
  <textarea
    v-if="type === 'textarea'"
    :value="modelValue"
    :placeholder="placeholder"
    :rows="rows || 4"
    class="admin-input"
    :class="{ 'is-block': block }"
    :style="{ resize: resize || 'vertical' }"
    @input="handleInput"
  ></textarea>

  <!-- input 標籤完全不需要 resize 樣式，所以這裡不寫 style -->
  <input
    v-else
    :type="type || 'text'"
    :value="modelValue"
    :placeholder="placeholder"
    class="admin-input"
    :class="{ 'is-block': block }"
    @input="handleInput"
  />
</template>

<style scoped>
/* 共用樣式 */
.admin-input {
  background-color: var(--resume-card-bg, white);
  border: 1px solid var(--icon-box-bg);
  border-radius: 4px;
  color: var(--color-text);
  padding: 0.5rem 0.75rem;
  font-size: 1rem;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;

  /* 基礎寬度 */
  min-width: 0;

  /* 確保字體繼承 */
  font-family: inherit;
}

.admin-input.is-block {
  width: 100%;
  display: block;
}

.admin-input:hover {
  border-color: var(--name-color);
}

.admin-input:focus {
  border-color: var(--name-color);
  box-shadow: 0 0 0 1px var(--name-color);
  outline: none;
}
</style>
