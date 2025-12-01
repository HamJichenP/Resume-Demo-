<script setup lang="ts">
import { ref } from 'vue'
import RPhoto from '../Component Library/Resume_Show/R_Photo.vue'
import RText from '../Component Library/Resume_Show/R_Text.vue'
import RContactItem from '../Component Library/Resume_Show/R_ContactItem.vue'

// 引入照片
import PhotoPath from '../../assets/icons/IMG_4391.jpg'

// 資料
const name = ref('Jack ChenP')
const title = ref('陳柏瑋')
const avatar = ref(PhotoPath)

const contacts = ref([
  { id: 1, icon: 'Mail', text: 'john.anderson@email.com' },
  { id: 2, icon: 'Call', text: '+1 (555) 123-4567' },
  { id: 3, icon: 'Home_Pin', text: 'San Francisco, CA' },
  { id: 4, icon: 'github', text: 'github.com/johnanderson' },
])
</script>

<template>
  <div class="resume-block">
    <div class="contact-section">
      <div class="photo-wrapper">
        <RPhoto :avatar="avatar" />
      </div>

      <div class="contact-info">
        <div class="contact-header">
          <RText :text="name" class="contact-name" />
          <RText :text="title" class="contact-title" />
        </div>

        <div class="contact-list">
          <RContactItem
            v-for="item in contacts"
            :key="item.id"
            :icon="item.icon"
            :text="item.text"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* === 1. 佈局樣式 (Layout) === */
.resume-block {
  transition: background-color 0.3s ease;
}

.contact-section {
  display: flex;
  flex-direction: row;
  gap: 2rem;
  align-items: center;
  justify-content: flex-start;
}

.photo-wrapper {
  margin-left: 60px; /* 控制大頭照的位置 */
  flex-shrink: 0;
}

.contact-info {
  margin-left: 100px; /* 控制文字區的位置 */
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.contact-header {
  margin-bottom: 2rem;
}

.contact-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* === 2. 注入樣式 (Injection) - 給 R_Text 用的 === */

.contact-name {
  color: var(--name-color);
  margin: 0;
  font-size: 3rem;
  line-height: 1.2;
}

.contact-title {
  margin: 0;
  color: var(--title-color);
  font-size: 40px;
}
</style>
