import { ref, computed } from 'vue'
import GithubIcon from '@/assets/icons/GithubIcon.vue'
import InstagramIcon from '@/assets/icons/InstagramIcon.vue'

export function useIconPicker() {
  const iconList = ref(['mail', 'call', 'home_pin', 'github', 'link', 'instagram'])
  iconList.value.sort()

  const iconSearchQuery = ref('')
  const showIconDropdown = ref(false)

  // 篩選邏輯
  const filteredIcons = computed(() => {
    const query = iconSearchQuery.value.toLowerCase()
    if (!query) return iconList.value.slice(0, 10)
    return iconList.value.filter((icon) => icon.includes(query))
  })

  // 取得圖示元件邏輯
  const getIcon = (iconName: string) => {
    if (iconName === 'github') return GithubIcon
    if (iconName === 'instagram') return InstagramIcon
    return 'span'
  }

  return {
    iconList,
    iconSearchQuery,
    showIconDropdown,
    filteredIcons,
    getIcon
  }
}
