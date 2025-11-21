import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/ResumeView.vue'
import About from '../views/AboutView.vue'
import Backend from '../views/BackendView.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/about', name: 'About', component: About },
  { path: '/back', name: 'Back', component: Backend }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
