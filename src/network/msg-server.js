import {Service,baseURL} from './index'
import axios from 'axios'
const newService = axios.create({
  baseURL,
})
newService.interceptors.request.use((config) => {
  config.headers = Object.assign({}, config.headers, {
      token: sessionStorage.getItem('token')
  })
  config.headers['Content-Type'] = 'application/json;charset=UTF-8'
  return config
})
//获取最新的六条消息
export const getLastestNotice = () => {
  return Service.get('/notice/tip')
}
//分页 获取消息列表
export const getNoticeList = (params) => {
  return Service.get('/notice',{
    params,
  })
}
//批量删除信息
export const deleteNotice = params => {
  return newService.delete('/notice/delete',params)
}
//批量读取信息
export const readNotice = params => {
  return newService.post('/notice/read',params)
}