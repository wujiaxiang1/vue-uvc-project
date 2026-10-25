import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '@/views/login/LoginPage.vue'
import LayoutPage from '@/views/layout/LayoutPage.vue'
import HomePage from '@/views/home/HomePage.vue'
import UVCPage from '@/views/uvc/UVCPage.vue'
import UVCHistoryPage from '@/views/uvc/UVCHistoryPage.vue'
import CountPage from '@/views/count/CountPage.vue'
import CountHistoryPage from '@/views/count/CountHistoryPage.vue'
import QAPage from '@/views/assistant/QAPage.vue'
import KnowledgeBasesPage from '@/views/assistant/KnowledgeBasesPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', component: LoginPage },
    {
      path: '/',
      component: LayoutPage,
      redirect: '/home',
      children: [
        { path: 'home', component: HomePage },
        { path: 'uvc', component: UVCPage },
        { path: 'uvc/history', component: UVCHistoryPage },
        { path: 'count', component: CountPage },
        { path: 'count/history', component: CountHistoryPage },
        { path: 'assistant', component: QAPage },
        { path: 'assistant/knowledge', component: KnowledgeBasesPage }
      ]
    }
  ]
})

export default router
