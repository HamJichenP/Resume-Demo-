import { ref } from 'vue'

// 1. 定義資料介面 (Interface)
export interface BulletItem {
  id: number
  text: string
  isEditing: boolean
}

export interface AboutMeData {
  paragraph: string
  bullets: BulletItem[]
}

export function useAboutMe() {

  // 2. 初始假資料 (Mock Data)
  // 這裡使用 JSON.parse/stringify 做深層複製，避免參照問題
  const initialData: AboutMeData = {
    paragraph:
      "I'm a passionate product designer with over 8 years of experience creating user-centered digital experiences. My work focuses on bridging the gap between user needs and business goals through thoughtful design solutions.",
    bullets: [
      { id: 1, text: 'Specialized in design systems, user research, and cross-functional collaboration', isEditing: false },
      { id: 2, text: 'Strong advocate for accessibility and inclusive design practices', isEditing: false },
      { id: 3, text: 'Experienced in leading design teams and mentoring junior designers', isEditing: false },
    ],
  }

  // 3. 狀態變數 (State)
  const aboutData = ref<AboutMeData>(JSON.parse(JSON.stringify(initialData)))
  const newItemText = ref('') // 用於新增項目的暫存文字

  // 4. 邏輯函式 (Actions)

  // 新增項目
  const addNewItem = () => {
    if (newItemText.value.trim() === '') return

    const newId = aboutData.value.bullets.length > 0
      ? Math.max(...aboutData.value.bullets.map((b) => b.id)) + 1
      : 1

    aboutData.value.bullets.push({
      id: newId,
      text: newItemText.value.trim(),
      isEditing: false,
    })

    newItemText.value = '' // 清空輸入框
  }

  // 刪除項目
  const deleteItem = (id: number) => {
    aboutData.value.bullets = aboutData.value.bullets.filter((item) => item.id !== id)
  }

  // 儲存所有變更 (模擬 API)
  const saveAllChanges = () => {
    console.log('正在儲存 About Me 的變更...', aboutData.value)
    alert('變更已儲存 (模擬)')
    // 未來這裡接 API: await api.post('/about', aboutData.value)
  }

  // 5. 匯出 (Return)
  return {
    aboutData,
    newItemText,
    addNewItem,
    deleteItem,
    saveAllChanges
  }
}
