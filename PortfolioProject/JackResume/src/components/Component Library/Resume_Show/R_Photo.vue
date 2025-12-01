<script setup lang="ts">
defineProps<{ avatar: string }>()
</script>

<template>
  <div class="photo-container">
    <img :src="avatar" alt="User Avatar" class="profile-photo" />
  </div>
</template>

<style scoped>
.photo-container {
  display: inline-block;
}

.profile-photo {
  width: 18rem;
  height: 18rem;
  border-radius: 50%;
  object-fit: cover;
  /* 使用變數：照片邊框 */
  border: 4px solid var(--photo-border);
}
</style>

