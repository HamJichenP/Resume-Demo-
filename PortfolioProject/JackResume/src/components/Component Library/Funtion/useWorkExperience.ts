import { ref } from 'vue'

// --- 1. 定義介面 (Interfaces) ---
export interface Responsibility {
  id: number
  text: string
}

export interface WorkExperienceItem {
  id: number
  startDate: string
  endDate: string
  jobTitle: string
  jobCompany: string
  responsibilities: Responsibility[]
  // UI 狀態：用於控制該區塊的新增職責輸入框
  newResponsibilityText: string
}

// --- 2. Composable ---
export function useWorkExperience() {
  // 模擬初始數據 (未來這裡會由 API 取得)
  const initialData: WorkExperienceItem[] = [
    {
      id: 1,
      startDate: '2018-09',
      endDate: '2021-10',
      jobTitle: 'Product Designer',
      jobCompany: 'DesignStudio',
      responsibilities: [
        { id: 1, text: 'Designed mobile and web applications for various clients.' },
      ],
      newResponsibilityText: '',
    },
    {
      id: 2,
      startDate: '2021-10',
      endDate: 'Ongoing',
      jobTitle: 'Senior Product Designer',
      jobCompany: 'TechCorp Inc.',
      responsibilities: [
        { id: 1, text: 'Lead design initiatives for flagship SaaS platform.' },
      ],
      newResponsibilityText: '',
    },
  ]

  // 狀態 Ref
  const workExperiences = ref<WorkExperienceItem[]>(initialData)

  // --- Actions (CRUD) ---

  // 1. 新增工作區塊
  const addJob = () => {
    const currentIds = workExperiences.value.map((j) => j.id)
    const newId = currentIds.length > 0 ? Math.max(...currentIds) + 1 : 1

    workExperiences.value.push({
      id: newId,
      startDate: '',
      endDate: '',
      jobTitle: '',
      jobCompany: '',
      responsibilities: [],
      newResponsibilityText: '',
    })
  }

  // 2. 刪除工作區塊
  const removeJob = (jobId: number) => {
    if (!confirm('確定要刪除此工作經歷嗎？')) return
    workExperiences.value = workExperiences.value.filter((job) => job.id !== jobId)
  }

  // 3. 新增職責 (針對特定 Job)
  const addResponsibility = (job: WorkExperienceItem) => {
    if (!job.newResponsibilityText.trim()) return

    const currentIds = job.responsibilities.map((r) => r.id)
    const newId = currentIds.length > 0 ? Math.max(...currentIds) + 1 : 1

    job.responsibilities.push({
      id: newId,
      text: job.newResponsibilityText.trim(),
    })
    job.newResponsibilityText = '' // 清空輸入框
  }

  // 4. 刪除職責
  const removeResponsibility = (job: WorkExperienceItem, respId: number) => {
    job.responsibilities = job.responsibilities.filter((r) => r.id !== respId)
  }

  return {
    workExperiences,
    addJob,
    removeJob,
    addResponsibility,
    removeResponsibility,
  }
}
