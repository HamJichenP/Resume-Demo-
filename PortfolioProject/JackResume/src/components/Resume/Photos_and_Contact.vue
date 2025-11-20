<script setup lang="ts">
import GithubIcon from '@/assets/GithubIcon.vue'
</script>

<template>
  <div class="resume-block">
    <div class="contact-section">
      <div class="photo-container">
        <img src="../icons/IMG_4391.jpg" alt="Professional headshot" class="profile-photo" />
      </div>
      <div class="contact-info">
        <h1 class="contact-name">Jack ChenP</h1>
        <p class="contact-title">陳柏瑋</p>
        <div class="contact-list">

          <div class="contact-item">
            <div class="edu-icon">
              <span class="material-symbols-outlined icon-symbol">Mail</span>
            </div>
            <span>john.anderson@email.com</span>
          </div>

          <div class="contact-item">

            <div class="edu-icon">
              <span class="material-symbols-outlined icon-symbol">Call</span>
            </div>
            <span>+1 (555) 123-4567</span>
          </div>

          <div class="contact-item">

            <div class="edu-icon">
              <span class="material-symbols-outlined icon-symbol">Home_Pin</span>
            </div>
            <span>San Francisco, CA</span>
          </div>

          <div class="contact-item">
            <div class="edu-icon">
              <GithubIcon />
            </div>
            <span>github.com/johnanderson</span>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<style>
.resume-block {
  background-color: #fff6e8;
  border-radius: 0.5rem;
  box-shadow:
    0 1px 3px 0 rgba(0, 0, 0, 0.1),
    0 1px 2px 0 rgba(0, 0, 0, 0.06);
  padding: 2rem;
}

/* Block 1: Photo and Contact */
.contact-section {
  display: flex;
  flex-direction: row;
  gap: 2rem;
  align-items: center;
  justify-content: flex-start;
}

.photo-container {
  margin-left: 55px;
  flex-shrink: 0;
}

.profile-photo {
  width: 15rem;
  height: 15rem;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #fde68a;
}

.contact-info {
  margin-left: 100px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.contact-header {
  margin-bottom: 2rem;
}

.contact-name {
  color: #f97316;
  margin: 0;
  font-size: 3rem;
  line-height: 1.2;
}

.contact-title {
  margin: 0;
  color: #fb7185;
  font-size: 40px;
}

.contact-list {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 0.875rem;
  color: #374151;
  font-size: 20px;
}

.contact-icon {
  width: 1.25rem;
  height: 1.25rem;
  color: #df7606;
  flex-shrink: 0;
}

</style>
