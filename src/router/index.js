import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:"/login",
  },
  {
    path:"/login",
    name:"login",
    component:()=>import(/* webpackChunkName: "login" */'../views/login')
  },
  {
    path:"/manager",
    name:"manager",
    component:()=>import(/* webpackChunkName: "manager" */"../views/manager")
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
