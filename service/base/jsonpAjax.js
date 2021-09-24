// 原始文档https://github.com/webmodules/jsonp
import jsonp from 'jsonp'

function connectUrl(data) {
  let url = ''
  for (let k in data) {
    let value = data[k] !== undefined ? data[k] : ''
    url += `&${k}=${encodeURIComponent(value)}` //使用的es6的模板字符串的用法 ${}
  }
  return url ? url.substring(1) : '' //这里主要判断data是否为空
}

const handlerOpt = ({
  url = '',
  baseURL = '', // 将会拼接到url前面
  data = {}, // 传入的参数,注意是对象
  timeout = 60 * 1000,
  jsonpOpt = {},
}) => {
  url = baseURL + url // 拼接基础路径
  //拼接字符串（根路径 + 参数）,看根路径是否包含 ‘？’
  url = url + (url.indexOf('?') < 0 ? '?' : '&') + connectUrl(data)

  jsonpOpt = {
    // param 用于指定回调的查询字符串参数的名称（默认为callback）
    // prefix 处理 jsonp 响应的全局回调函数的前缀（默认为__jp）
    // name 处理 jsonp 响应的全局回调函数的名称（默认为prefix+ 递增计数器）
    timeout, //发出超时错误后多长时间。0禁用（默认为60000）
    ...jsonpOpt,
  }
  return {
    url,
    baseURL,
    data,
    timeout,
    jsonpOpt,
  }
}

//封装一个jsonp的函数
export default function jsonpAjax(opt = {}) {
  let { url, jsonpOpt } = handlerOpt(opt)

  return new Promise((resolve, reject) => {
    jsonp(url, jsonpOpt, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}
