import axios from 'axios'
let isDev = process.env.NODE_ENV == 'development'
import router from '../router'
import el from 'element-ui'
import qs from 'qs'
// isDev = false
const baseURL = isDev ? "http://rap2.taobao.org:38080/app/mock/245259" : "http://ruankun.xyz:8821/disease/"
const service = axios.create({
    baseURL,
    
})
service.interceptors.request.use((config) => {
    var token = sessionStorage.getItem('token')
    if(config.method === 'post'){
        config.data = qs.stringify(config.data)
    }
    if (!token) {
        // return
        if (config.url == '/lab/token') {}
        // this.$router.replace('/login')

    } else {

    }
    config.headers = Object.assign({}, config.headers, {
        token: sessionStorage.getItem('token')
    })

    return config
})
service.interceptors.response.use((res) => {
    //做全局处理
    let data = isDev ? res : res.data
    // console.log(data)
    // console.log(res)
    
    const SUCCESS_STATUS = isDev ? 200 : 1
    if (data.status === SUCCESS_STATUS) {
        return res.data
    } else {
        el.Alert({
            confirmButtonText:"服务器错误,请刷新或者重新登录",
            callback:action=>{
                router.push('/login')
            }
        })
        return res
    }
})
export const errorHandle = () => {
    el.MessageBox({
        message:"登录身份过期,请重新登录!",
        confirmButtonText:"确定",
        callback:action=>{
            router.push('/login')
        }
    })
}

//下面写接口

//登录接口
export const Login = (parmas) => {
    return service.post('/lab/token', parmas)
}
//获取实验室信息
export const getLaboratory = () => {
    return service.get('/laboratory')
}
//获取已上架列表
export const getOnsaleList = () => {
    return service.get('/laboratory/item/onsale')
}
export const getOffsaleList = () => {
    return service.get('/laboratory/item/offsale')
}
export const getUserInfo = ()=>{
    return service.get('/user/info')
}