import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect:'/one',
    beforeEnter: (to, from, next) => {
      if(sessionStorage.getItem('isLogin')){
        next()
      }else{
        next('/login')
      }
    },
    children:[{
      path: '/one',
      name: 'One',
      component: () => import( '../views/child/One.vue'),
      beforeEnter: (to, from, next) => {
        if(sessionStorage.getItem('isLogin')){
          next()
        }else{
          next('/login')
        }
      },
    },{
      path: '/two',
      name: 'Two',
      component: () => import( '../views/child/Two.vue'),
      beforeEnter: (to, from, next) => {
        if(sessionStorage.getItem('isLogin')){
          next()
        }else{
          next('/login')
        }
      },
    },{
      path: '/three',
      name: 'Three',
      component: () => import( '../views/child/Three.vue'),
      beforeEnter: (to, from, next) => {
        if(sessionStorage.getItem('isLogin')){
          next()
        }else{
          next('/login')
        }
      },
    }]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import( '../views/Login.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import( '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history', //hash 
  base: process.env.BASE_URL,
  routes
})





export default router
