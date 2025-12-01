<script setup lang="ts">
defineProps<{ text: string }>()
</script>

<template>
  <h1 class="first-name">{{ text }}</h1>
</template>


