<script setup lang="ts">
import { useTheme } from '../router/useTheme'
const { isDark, toggleTheme } = useTheme()
</script>

<template>
  <footer class="header">
    這是 Header
    <label class="switch">
      <input type="checkbox" :checked="isDark" @change="toggleTheme" />
      <span class="slider round"></span>
    </label>
  </footer>
</template>

<style scoped>
.header {
  padding: 20px;
  text-align: center;
  border: 1px solid black;
}

.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
  margin-left: 12px;
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
  border-radius: 24px;
}

.slider:before {
  position: absolute;
  content: '';
  height: 18px;
  width: 18px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #4fd1c5;
}

input:checked + .slider:before {
  transform: translateX(26px);
}

.slider.round {
  border-radius: 24px;
}
</style>
