import { ajax } from '@/services/base/axiosAjax'
import config from './config'
import Tips from './base/tips'

import { loginOut } from '@/services/tool/LoginSet'
import vuex from '@/store/index'
import qs from 'qs'

// 口令封装处理
const handlerToken = (header = {}) => {
  const token = vuex.state.user.token
  if (!token) return header
  header['Authorization'] = token
  return header
}

// 401退出登录
const signOut = () => {
  loginOut()
  Tips.error({ msg: '用户登录失效,将重新登录', title: '错误' })
}

// 业务接口
const BaseApi = async (
  opt = {},
  { prefix = '', codeField = 'success', dataField = 'data', codeNum = true, msgField = 'message' },
) => {
  const error = opt.error ?? true // 成功提醒
  const success = opt.success ?? false // 错误提醒
  opt.baseURL = config.domainName
  opt.url = prefix + opt.url

  opt.headers = opt.headers ?? { 'Content-Type': 'application/json' } // 设置默认headers
  opt.headers = handlerToken(opt.headers)
  opt.file = opt.file ?? false // 是否为文件模式，文件下载模式为后端直接下载文件，不做处理判断

  opt.responseType = opt.responseType ?? 'json'

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
      vuex.commit('set_data', {
        user: {
          token: result.headers['authorization'],
        },
      })
    }

    if (result.status === 401) {
      signOut()
      return Promise.reject(result)
    }

    switch (opt.file) {
      case false: {
        const response = result.data

        const code = response[codeField]
        const data = response[dataField]
        const message = response[msgField]

        if (code === codeNum) {
          success &&
            Tips.success({
              msg: success !== true ? success : message ?? '成功',
            })

          return Promise.resolve(data)
        } else {
          error && Tips.error({ msg: error !== true ? error : message ?? '失败' })

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
    if (response.status === 401) signOut()
    else {
      const message = response.data[msgField]
      error && Tips.error({ msg: error !== true ? error : message ?? '失败' })
    }

    return Promise.reject(e)
  }
}
export { BaseApi }
