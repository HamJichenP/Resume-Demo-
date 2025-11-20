import { ref , computed ,watchEffect } from "vue";

type Theme = 'light' | 'dark'

// as Theme 確定型別放進的資料不是string
// getItem取得之前存進去的資料
const theme = ref<Theme>((localStorage.getItem('theme') as Theme) || 'light')

function toggleTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}

// Manual settings
function setTheme(t: Theme){
  theme.value = t
}

// watchEffect自動執行
watchEffect(() => {
  // document.documentElement 指 <html> 標籤
  // setAttribute 加上or修改
  document.documentElement.setAttribute('data-theme', theme.value)  //html變動時自動加上 data-theme
  //儲存在瀏覽器的永久記憶
  localStorage.setItem('theme', theme.value)
})

export function useTheme() {
  return {
    theme,
    isDark: computed( () => theme.value === 'dark'),
    toggleTheme,
    setTheme
  }
}