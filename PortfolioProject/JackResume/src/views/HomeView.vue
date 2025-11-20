<script setup lang="ts">
import PAC from '../components/Resume/Photos_and_Contact.vue'
import ABE from '../components/Resume/About_Me.vue'
import WEE from '../components/Resume/Work_Experience.vue'
import ELL from '../components/Resume/Education_level.vue'
</script>

<template>
  <div class="container">
    <div class="item">
      <PAC />
      <!-- Photos and Contact Information -->
    </div>

    <div class="item">
      <ABE />
      <!--About Me -->
    </div>

    <div class="item">
      <WEE />
      <!-- Work Experience -->
    </div>

    <div class="item">
      <ELL />
      <!-- Education_level -->
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 1000px;
  display: flex;
  gap: 3px;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: start;
  align-content: start;
  box-sizing: border-box;
}

.item {
  box-sizing: border-box;
}

.item:nth-child(1),
.item:nth-child(2) {
  flex-grow: 1;
  width: 70%;
  align-self: flex-start;
}

.item:nth-child(3),
.item:nth-child(4) {
  width: 100%;
  align-self: flex-start;
}

/* --------------------------------- */

h1,
h2,
button,
label,
p {
  caret-color: transparent;
}

/* --------------------------------- */

.switch {
  margin-right: 10px;
  vertical-align: middle;
  position: relative;
  display: inline-block;
  width: 50px;
  height: 26px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 26px;
}

.slider::before {
  position: absolute;
  content: '';
  height: 20px;
  width: 20px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #4caf50;
}

input:checked + .slider::before {
  transform: translateX(24px);
}

/* --------------------------------- */

.motion-btn {
  display: inline-block; /* 不要當行內文字一起排 */
  transform-origin: center; /* 放大時以中間為基準 */
}
</style>
