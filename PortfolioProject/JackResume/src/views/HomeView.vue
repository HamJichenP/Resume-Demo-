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
      </div>

    <div class="item">
      <ABE />
      </div>

    <div class="item">
      <WEE />
      </div>

    <div class="item">
      <ELL />
      </div>
  </div>
</template>

<style scoped>
/* ======================================================= */
/* 1. 基礎排版設定 (保持不變) */
/* ======================================================= */
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
  /* ✨ 讓所有卡片預設都具備基礎的卡片樣式 */
  background-color: var(--resume-card-bg);
  border-radius: 0.5rem;
  padding: 2rem; /* 給予內邊距 */
  /* 使用 Icon 前景色 (橘色) 的半透明版本作為邊框 */
  border: 4px solid rgba(249, 115, 22, 0.3);

  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  transition: background-color 0.3s ease, box-shadow 0.3s ease, border 0.3s ease;
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

/* ======================================================= */
/* 2. 特殊樣式：About Me (第二個 item) 加上橘色左邊框 */
/* ======================================================= */
.item:nth-child(2) {
  /* 橘色左側邊框：使用 Icon 的前景色變數，確保深色模式也能變亮 */
  /* 為了實現左側邊框更粗更深，我們覆蓋掉 item 上的 1px 邊框 */
  border-left: 4px solid var(--icon-box-fg);
  /* 其他三邊保留原來的 1px 邊框 */
  border-top: 1px solid rgba(249, 115, 22, 0.3);
  border-right: 1px solid rgba(249, 115, 22, 0.3);
  border-bottom: 1px solid rgba(249, 115, 22, 0.3);

  padding: 2rem 2rem 2rem 1.75rem; /* 為了視覺對齊，左側 padding 稍微減小 (2rem - 4px) */
}


/* ======================================================= */
/* 3. 其他基礎樣式 (保持不變) */
/* ======================================================= */

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
  display: inline-block;
  transform-origin: center;
}
</style>