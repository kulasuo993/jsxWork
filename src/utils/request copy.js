import axios  from "axios";
import {message,Modal} from 'antd'
import { ExclamationCircleOutlined } from "@ant-design/icons";
import store from '@/store/index'
import {resetUser} from '@/store/actions'
import CryptoJS from 'crypto-js'
import { getToken, removeToken } from '@/utils/auth'
import qs from 'qs'
const {confirm} = Modal

 
//创建axios实例
const service = axios.create({
  baseURL: 'https://admin-api-test.iyingdi.com',
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 0 // request timeout
})

//添加请求拦截器
service.interceptors.request.use(
  config => {
    config.headers['content-type'] = 'application/x-www-form-urlencoded'
    if (config.method.toLocaleLowerCase() === 'post' ||
      config.method.toLocaleLowerCase() === 'put' ||
      config.method.toLocaleLowerCase() === 'delete') {
      // 接口签名
      config.data['token'] = getToken() || 'login'
      config.data['timestamp'] = Date.parse(new Date()) / 1000
      const paramData = sortObjByASCII(config.data)
      let sign = ''
      for (const item in paramData) {
        sign += `${item}=${paramData[item]}&`
      }
      sign = `${sign}key=2d90bc1c110635cb8d80c84852f8c3f8`
      paramData.sign = CryptoJS.MD5(sign).toString()
      config.data = qs.stringify(paramData)
    }
    if (config.method.toLocaleLowerCase() === 'get') {
      config.params = {
        ...config.params
      }
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)
// 添加响应拦截器
service.interceptors.response.use(
    response => {
      // 如果代码走到这里，HTTP状态码=200
      const res = response.data
      console.log('----响应拦截器', res)
      // 对业务状态码进行判断
      if (res.retCode !== 0) {
        // 表示业务失败，就把错误信息弹出来
        message.error(res.msg || '入参有误')
  
        // // 当Token过期要求重新登录
        if (res.retCode === 1000001) {
          // 登录重新登录
          confirm({
            title: '当前你的登录已失效',
            icon: < ExclamationCircleOutlined />,
            content: '请重新登录',
            okText: '重新登录',
            // 隐藏取消按钮，要求必须重新登录
            cancelButtonProps: {
              style: {
                display: 'none'
              }
            },
            onOk() {
              store.dispatch(resetUser())
            }
          })
        }
        return Promise.reject(new Error(res.message || 'Error'))
      } else {
        return res.data
      }
    
    },
    error => {
      console.log('err' + error)
      return Promise.reject(error)
    }
  )
  /**
 * 将参数以ASCII码排序
 * @param params
 * @return {{}}
 */
  const sortObjByASCII = function(params) {
  const keysArr = Object.keys(params).sort()
  const sortObj = {}
  for (const i in keysArr) {
    sortObj[keysArr[i]] = params[keysArr[i]]
  }
  return sortObj
}
  
  export default service