import axios from 'axios';
import { MessageBox, Message } from 'element-ui';
// import store from '@/store'
// import { getToken } from '@/utils/auth'

// create an axios instance
const HttpUtils = axios.create({
  baseURL: process.env.VUE_APP_API_ROOT,
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 * 1000 // request timeout
})

// request interceptor
HttpUtils.interceptors.request.use(
  config => {
    // do something before request is sent
    // const token = getToken()
    // console.log('config',config)
    // console.log('token',token);
    console.log('全局调用请求参数',config.data)
    // if (token && config.method === 'post') {
    //   let each request carry token
    //   ['X-Token'] is a custom headers key
    //   please modify it according to the actual situation
    //   config.headers['X-Token'] = getToken()
    //   config.data.token = token
    // }else if(token && config.method == 'get'){
    //   config.params.token = token;
    // }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
HttpUtils.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    return res
    // if the custom code is not 20000, it is judged as an error.
    // if (res.code !== 20000) {
      // Message({
      //   message: res.message || 'Error',
      //   type: 'error',
      //   duration: 5 * 1000
      // })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      // if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
      //   // to re-login
      //   MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
      //     confirmButtonText: 'Re-Login',
      //     cancelButtonText: 'Cancel',
      //     type: 'warning'
      //   }).then(() => {
      //     store.dispatch('user/resetToken').then(() => {
      //       location.reload()
      //     })
      //   })
      // }
    //   return Promise.reject(new Error(res.message || 'Error'))
    // } else {
    //   return res
    // }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default HttpUtils
