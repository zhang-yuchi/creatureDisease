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
    name:"登录",
    component:()=>import(/* webpackChunkName: "login" */'../views/login'),
    children:[
      {
        path:"",
        redirect:"index"
      },
      {
        path:"index",
        name:"登录页",
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
        name:"个人中心",
        component:()=>import("../views/manager/profile")
      },
      {
        path:"order",
        name:"订单管理",
        component:() => import("../views/manager/order")
      },
      {
        path:"baseInfo",
        name:"基础信息",
        component:() => import("../views/manager/baseInfo")
      },
      {
        path:"project-setting",
        name:"检测项目配置",
        component:() => import("../views/manager/projectSetting")
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
