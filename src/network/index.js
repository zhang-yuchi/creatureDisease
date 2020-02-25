import axios from 'axios'
let isDev = process.env.NODE_ENV == 'development'
import router from '../router'
import el from 'element-ui'
import qs from 'qs'
isDev = false
const baseURL = isDev ? "http://rap2.taobao.org:38080/app/mock/245259" : "http://ruankun.xyz:8821/disease/"
const service = axios.create({
    baseURL,

})
service.interceptors.request.use((config) => {
    var token = sessionStorage.getItem('token')
    // console.log(config.data)
    // if(config.method === 'get'){
    //     console.log(111)
    //     config.data.hashTime = new Date()
    //     console.log(config)
    // }
    if (!token) {
        if (config.url == '/lab/token') {}

    } else {

    }
    config.headers = Object.assign({}, config.headers, {
        token: sessionStorage.getItem('token')
    })
    if(config.url==='/laboratory'&&config.method === 'post'){
        config.headers['Content-Type'] =  'application/json;charset=UTF-8'
    }else{
        config.data = qs.stringify(config.data)
    }
    return config
})
service.interceptors.response.use((res) => {
    //做全局处理
    let data = isDev ? res : res.data


    const SUCCESS_STATUS = isDev ? 200 : 1
    if (data.status === SUCCESS_STATUS) {
        return res.data
    } else {
        // el.Message({
        //     message:"服务器错误,请刷新或者重新登录",
        //     type:"error"
        // })
        
        return res
    }
})
export const errorHandle = () => {
    el.MessageBox({
        message: "登录身份过期,请重新登录!",
        confirmButtonText: "确定",
        callback: action => {
            router.push('/login')
        }
    })
}
function getRandom(url){
    return url + "?t="+Math.random()
}
function appendRandom(url){
    return url + "&t="+Math.random()
}
//文件上传
//图片上传
export const ImgUploadUrl = baseURL + "/file/image"
//pdf上传
export const PdfUploadUrl = baseURL + "/file/pdf"

//下面写接口

//登录接口
export const Login = (parmas) => {
    return service.post('/lab/token', parmas)
}
//是否需要获取验证码
export const needCheck = () => {
    return service.get(getRandom("/lab/verifycode/need"))
}
//获取验证码
export const getCheck = () => {
    return axios({
        url: baseURL + getRandom("/lab/verifycode"),
        method: "get",
        responseType: "blob"
    })
}
//获取实验室信息
export const getLaboratory = () => {
    return service.get(getRandom('/laboratory'))
}
export const modifyLaboratory = (params) => {
    return service.post('/laboratory', params)
}
//获取已上架列表
export const getOnsaleList = () => {
    return service.get(getRandom('/laboratory/item/onsale'))
}
//获取未上架列表
export const getOffsaleList = () => {
    return service.get(getRandom('/laboratory/item/offsale'))
}
//上架商品
export const onSaleItem = (parmas) => {
    return service.post(`/laboratory/item/${parmas.id}/on`)
}
//下架商品
export const offSaleItem = (parmas) => {
    return service.post(`/laboratory/item/${parmas.id}/off`)
}
//编辑物品 改变库存和价格
export const editLabItem = (parmas) => {
    return service.post('/laboratory/item/' + parmas.id, {
        price: parmas.price,
        inventory: parmas.inventory
    })
}
//查看单个物品
export const getSingleItem = (parmas) => {
    return service.get(appendRandom(`/laboratory/item/${parmas.id}`), {
        params: {
            repertoryId: parmas.id
        }
    })
}
export const getImage = (params) => {
    // console.log(id)
    return service.get(getRandom('/file/pic/' + params.id))
}
export const getPdf = (id) => {
    return service.get(getRandom('/file/pdf/' + id))
}
//获取用户信息
export const getUserInfo = () => {
    return service.get(getRandom('/user/info'))
}
//修改密码
export const modifyPassword = (params) => {
    return service.post('/user/password',params)
}
//修改手机号
export const modifyPhone = (params) => {
    return service.post('/user/phone',params)
}
//修改用户名
export const modifyUsername = (params) => {
    return service.post('/user/username',params)
}