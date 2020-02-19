import axios from 'axios'
const baseURL = ""
const service = axios.create({
    baseURL,
})
service.interceptors.request.use((config)=>{
    return config
})
service.interceptors.response.use((res)=>{
    //做全局处理
})

//下面写接口
