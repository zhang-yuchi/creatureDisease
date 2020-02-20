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
    component:()=>import(/* webpackChunkName: "login" */'../views/login'),
    children:[
      {
        path:"",
        redirect:"index"
      },
      {
        path:"index",
        name:"index",
        component:()=>import('../views/login/login')
      },
      {
        path:"step1",
        name:"changePsw01",
        component:()=>import('../views/login/changePsw')
      },
      {
        path:"step2",
        name:"changePsw02",
        component:()=>import('../views/login/checkPsw')
      },
      {
        path:"success",
        name:"changePsw03",
        component:()=>import('../views/login/success')
      },
    ]
  },
  {
    path:"/manager",
    name:"manager",
    component:()=>import(/* webpackChunkName: "manager" */"../views/manager"),
    children:[
      {
        path:"",
        redirect:"profile",
      },
      {
        path:"profile",
        name:"profile",
        component:()=>import("../views/manager/profile")
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
