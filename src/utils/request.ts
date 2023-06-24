import axios from 'axios'

const request = axios.create({
  // API 请求的默认前缀
  baseURL: 'http://localhost:3009',
  timeout: 60000, // 请求超时时间
  //headers: {'Content-Type': 'multipart/form-data'}
})

// 异常拦截处理器
const errorHandler = (error: any) => {
  if (error.response) {
    const data = error.response.data
    if (error.response.status === 403) {
      console.error(data.message)
    }
    if (error.response.status === 401 && !(data.result && data.result.isLogin)) {
      console.log('Authorization verification failed')
    }
  }
  return Promise.reject(error)
}

request.interceptors.request.use(config => {
  // const token = storage.get('token')
  // if (token) {
  //   config.headers['Access-Token'] = token
  // }
  return config
}, errorHandler)

request.interceptors.response.use((response) => {
  return response.data
}, errorHandler)

export default request