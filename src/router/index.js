import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../pages/HomeView.vue'
import ContactApp from '../pages/ContactApp.vue'
import ContactDetails from '../pages/ContactDetails.vue'
import ContactEdit from '../pages/ContactEdit.vue'
import StatisticPage from '../pages/StatisticPage.vue'
import LoginSignup from '../pages/LoginSignup.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomeView
    },
    {
      path: '/login',
      component: LoginSignup
    },
    {
      path: '/contacts',
      component: ContactApp
    },
    {
      path: '/contacts/:_id',
      component: ContactDetails
    },
    {
      path: '/contacts/edit/:_id?',
      component: ContactEdit
    },
    {
      path: '/charts',
      component: StatisticPage
    },
    {
      path: '/about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../pages/AboutView.vue')
    }
  ]
})

export default router
