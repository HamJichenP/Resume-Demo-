<script setup lang="ts">
defineProps<{
  // 1. 樣式變體：決定按鈕顏色
  // primary: 主色 (橘) - 用於主要動作
  // danger: 危險 (紅) - 用於刪除
  // success: 成功 (綠) - 用於儲存
  // secondary: 次要 (灰/淺色) - 用於取消或編輯
  variant?: 'primary' | 'danger' | 'success' | 'secondary'

  // 2. 按鈕行為：是普通按鈕還是表單送出？
  type?: 'button' | 'submit'

  // 3. 載入狀態：是否正在轉圈圈？
  loading?: boolean
}>()

const emit = defineEmits<{
  // 按鈕點擊事件
  (e: 'click', event: MouseEvent): void
}>()
</script>
<template>
  <button
    :type="type || 'button'"
    class="admin-btn"
    :class="[`btn-${variant || 'primary'}`, { 'is-loading': loading }]"
    @click="(e) => emit('click', e)"
  >
    <span v-if="loading" class="spinner"></span>

    <span v-else class="btn-content">
      <slot />
    </span>
  </button>
</template>

<style scoped>
/* === 1. 基礎結構 === */
.admin-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem; /* Icon 和文字的間距 */

  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 6px;

  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  user-select: none;
}

/* 禁用狀態 (變半透明、禁止滑鼠) */
.admin-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  filter: grayscale(0.5);
}

/* === 2. 顏色變體 (Variants) === */

/* Primary (預設橘色) */
.btn-primary {
  background-color: var(--name-color, #f97316);
  color: white;
}
.btn-primary:not(:disabled):hover {
  filter: brightness(1.1); /* 變亮一點 */
}

/* Success (綠色 - 儲存用) */
.btn-success {
  background-color: #10b981;
  color: white;
}
.btn-success:not(:disabled):hover {
  background-color: #059669;
}

/* Danger (紅色 - 刪除用) */
.btn-danger {
  background-color: #ef4444;
  color: white;
}
.btn-danger:not(:disabled):hover {
  background-color: #dc2626;
}

/* Secondary (淺色 - 取消/編輯用) */
.btn-secondary {
  background-color: var(--icon-box-bg, #f3f4f6);
  color: var(--color-text, #333);
  border: 1px solid transparent;
}
.btn-secondary:not(:disabled):hover {
  filter: brightness(0.95); /* 變暗一點 */
}

/* === 3. Loading 動畫 (CSS 轉圈圈) === */
.spinner {
  width: 1.2em;
  height: 1.2em;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* 內容容器 */
.btn-content {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
</style>
