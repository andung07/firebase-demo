import Vue from 'vue'
import Router from 'vue-router'
import LoginPage from '@/components/Login'
import HomePage from '@/components/Home'
import TestPage from '@/components/Test'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/login'
    },
    {
      path: '/home/:menu',
      component: HomePage
    },
    {
      path: '/login',
      component: LoginPage
    },
    {
      path: '/test',
      component: TestPage
    }
  ]
})
