import axios from 'axios'
import jsonpAjax from './jsonpAjax'
import { Loading } from 'element-ui'

// axios函数封装
const ajax = async ({
  url = '',
  loading = false, // 加载拦截
  baseURL = '',
  data = {},
  params = {}, // 地址栏拼接数据，仅限于'put', 'post', 'patch'
  headers = { 'Content-Type': 'application/json;charset=UTF-8' }, // 头部信息处理
  method = 'get',
  timeout = 30 * 1000,
  responseType = 'json', // 表示服务器响应的数据类型，可以是 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
  jsonp = false, //是否使用jsonp请求接口
  jsonpOpt = {}, // jsonp库的options参数
}) => {
  // 接口全局加载提示
  let loadingInstance = ''
  if (loading !== false) {
    loadingInstance = Loading.service({
      lock: true,
      text: loading !== true ? loading : '加载中……',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.5)',
    })
  }
  try {
    const posts = ['put', 'post', 'patch'] // 使用data作为发送数据主体
    let response = null
    if (jsonp) {
      response = await jsonpAjax({
        url,
        baseURL,
        data,
        timeout,
        jsonpOpt,
      })
    } else {
      response = await axios({
        url: url,
        baseURL: baseURL,
        headers: headers,
        method: method,
        params,
        [posts.includes(method.toLowerCase()) ? 'data' : 'params']: data,
        timeout: timeout,
        responseType,
      })
    }

    loadingInstance && loadingInstance.close()
    return Promise.resolve(response)
  } catch (e) {
    loadingInstance && loadingInstance.close()
    return Promise.reject(e)
  }
}

export { ajax }
