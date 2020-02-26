import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: "/login",
  },
  {
    path: "/login",
    name: "登录",
    component: () => import( /* webpackChunkName: "login" */ '../views/login'),
    children: [{
        path: "",
        redirect: "index"
      },
      {
        path: "index",
        name: "中移动物疫检平台",
        component: () => import('../views/login/login')
      },
      {
        path: "step1",
        component: () => import('../views/login/changePsw')
      },
      {
        path: "step2",
        component: () => import('../views/login/checkPsw')
      },
      {
        path: "success",
        component: () => import('../views/login/success')
      },
    ]
  },
  {
    path: "/manager",
    name: "manager",
    component: () => import( /* webpackChunkName: "manager" */ "../views/manager"),
    children: [{
        path: "",
        redirect: "profile",
      },
      {
        path: "profile",
        name: "个人中心",
        component: () => import("../views/manager/profile")
      },
      {
        path: "order",
        name: "订单管理",
        component: () => import("../views/manager/order")
      },
      {
        path: "order-detail",
        name: "订单详情",
        component: () => import("../views/manager/orderDetail")
      },
      {
        path: "baseInfo",
        name: "基础信息",
        component: () => import("../views/manager/baseInfo")
      },
      {
        path: "project-setting",
        name: "检测项目配置",
        component: () => import("../views/manager/projectSetting")
      },
      {
        path:"*",
        name:"error",
        component:()=>import('../components/notFound/404')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  //路由守卫
  
  next()
})
router.afterEach((to,from,next) => {
  if(to.name){
    document.title = to.name
  }
})
export default router