import { ref } from 'vue'

// 定義介面 (最好移到 types/ 或是放在這裡導出)
export interface ContactItem {
  id: number
  icon: string
  type: string
  value: string
  isEditing: boolean
}

export function useContacts() {
  // 狀態
  const contacts = ref<ContactItem[]>([
    { id: 1, icon: 'mail', type: 'Email', value: 'john.anderson@email.com', isEditing: false },
    { id: 2, icon: 'call', type: 'Phone', value: '+1 (555) 123-4567', isEditing: false },
    // ... 其他預設資料
  ])

  const newContact = ref({
    icon: 'mail',
    type: '',
    value: '',
  })

  // 邏輯 (Actions)
  const addContact = () => {
    if (newContact.value.type && newContact.value.value) {
      // 產生新的ID時+1
      const newId = contacts.value.length > 0 ? Math.max(...contacts.value.map((c) => c.id)) + 1 : 1
      // 推入陣列 (Push)
      contacts.value.push({
        id: newId,
        ...newContact.value,
        isEditing: false,
      })
      // 重置(輸入框清空)
      newContact.value = { icon: 'mail', type: '', value: '' }
    }
  }

  const deleteContact = (id: number) => {
    contacts.value = contacts.value.filter((c) => c.id !== id)
  }

  const toggleEdit = (contact: ContactItem) => {
    contact.isEditing = !contact.isEditing
  }

  const saveChanges = (contact: ContactItem) => {
    // 這裡未來可以呼叫 API
    contact.isEditing = false
  }

  // 把 UI 需要用到的東西吐出去
  return {
    contacts,
    newContact,
    addContact,
    deleteContact,
    toggleEdit,
    saveChanges
  }
}
