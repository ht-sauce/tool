import { ajax } from '@/services/base/axiosAjax'
import config from './config'
import Tips from './base/tips'

import { loginOut } from '@/services/tool/LoginSet'
import vuex from '@/store/index'
import qs from 'qs'
import { antiShake } from '@/utils/antiShakingAndThrottling'

// 口令封装处理
const handlerToken = (header = {}) => {
  const token = vuex.getters.token
  if (!token) return header
  header['Authorization'] = token
  return header
}
// 401退出登录
const signOut = antiShake(() => {
  loginOut()
  Tips.error({ msg: '用户登录失效,将重新登录', title: '错误' })
}, 1000)

// 处理opt传入参数
const handlerData = (opt, apiBase = {}) => {
  const { prefix } = apiBase
  opt.baseURL = config.domainName
  opt.url = prefix + opt.url

  opt.headers = opt.headers ?? { 'Content-Type': 'application/json' } // 设置默认headers
  opt.headers = handlerToken(opt.headers)
  opt.file = opt.file ?? false // 是否为文件模式，文件下载模式为后端直接下载文件，不做处理判断
  opt.mock = opt.mock ?? process.env.VUE_APP_NODE_ENV === 'rapmock' // 是否为mock模式

  // opt.responseType = opt.responseType ?? (opt.mock ? 'json' : 'text') // 细节需要加括号,上环境情况下后端返回的数据是base64字符串
  opt.responseType = opt.responseType ?? 'json'
  opt.isResponse = opt.isResponse ?? false // 是否直接获取response数据，避免因为简化data数据获取导致无法获取完整数据情况
  opt.reLogin = opt.reLogin ?? true // 是否判断401状态跳转到登录页面

  return opt
}
// 错误信息
const handlerErrorMessage = (error, message, tipsCode) => {
  error &&
    Tips.error({ msg: error !== true ? error : message ?? '系统异常，请稍后重试！', tipsCode })
}
// 成功信息
const handlerSuccessMessage = (success, message, tipsCode = '') => {
  success &&
    Tips.success({
      msg: success !== true ? success : message ?? '成功',
      tipsCode,
    })
}

// 业务接口
async function BaseApi(
  opt = {},
  {
    prefix = '',
    codeField = 'success',
    dataField = 'data',
    codeNum = true,
    msgField = 'message',
    tipsCode = 'errorCode',
  },
) {
  opt = handlerData(opt, { prefix }) // 参数预处理

  const error = opt.error ?? true // 成功提醒
  const success = opt.success ?? false // 错误提醒

  // 特殊格式请求处理
  const posts = ['put', 'post', 'patch']
  if (
    posts.includes(opt.method) &&
    opt.headers['Content-Type'] === 'application/x-www-form-urlencoded'
  ) {
    opt.data = qs.stringify(opt.data)
  }

  try {
    const result = await ajax(opt) // 请求接口

    if (result.headers['authorization']) {
      vuex.commit('user/SET_TOKEN', result.headers['authorization'])
    }
    if (opt.reLogin && result.status === 401) {
      signOut()
      return Promise.reject(result)
    }

    switch (opt.file) {
      case false: {
        // 解密后端返回信息
        /*const response = opt.mock ? result.data
          : result.data
          ? JSON.parse(base64Decode(result.data))
          : result.data;*/
        const response = result.data

        const code = response[codeField]
        const data = response[dataField]
        const message = response[msgField]
        const errCode = response[tipsCode]
        if (code === codeNum) {
          // 提前处理正确错误
          handlerSuccessMessage(success, message)

          return Promise.resolve(opt.isResponse ? response : data)
        } else {
          handlerErrorMessage(error, message, errCode)

          return Promise.reject(response)
        }
      }
      // 走文件模式下
      case true: {
        return Promise.resolve(result)
      }
    }
  } catch (e) {
    const response = e.response
    if (opt.reLogin && response?.status === 401) signOut()
    else {
      const resData = response?.data ?? {}
      const message = resData[msgField]
      const errCode = resData[tipsCode]
      handlerErrorMessage(error, message, errCode)
    }

    return Promise.reject(e)
  }
}

export { BaseApi }
