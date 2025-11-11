<template>
  <div>
    <h1>這是關於頁面 ℹ️</h1>
    <button @click="goHome">回首頁</button>
  </div>
</template>

<script setup lang="ts">
// 同樣這裡可以暫時留空

import { useRouter } from 'vue-router'

const router = useRouter()

function goHome() {
  router.push('/')
}
</script>
