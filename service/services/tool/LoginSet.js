import vuex from '@/store'
import router from '@/router'
import service from '@/services'
import { ElMessage } from 'element-plus'
// 退出登陆
async function loginOut() {
  try {
    await service.Nbs.logout()
    vuex.commit('clear_data')
    const params = {
      name: '/login',
    }
    await router.replace(params)
    return Promise.resolve()
  } catch (e) {
    return Promise.reject(e)
  }
}
// 轮询权限
class PollingAuth {
  orgid
  timeout
  constructor({ orgid, time = 5000 }) {
    this.orgid = orgid
    this.timeout = time
  }
  timeint = 0
  runing = false
  start() {
    try {
      const orgid = this.orgid
      const timeout = this.timeout

      if (!orgid) return null

      this.runing = true

      let pollingAuthIn = false // 是否接口请求中

      const authquery = () => {
        if (!this.runing) return null
        this.timeint = window.setInterval(async () => {
          try {
            pollingAuthIn = true
            if (pollingAuthIn) await service.UserApi.login.pollingAuth({ error: false })

            pollingAuthIn = false
          } catch (e) {
            pollingAuthIn = false
            // 错误则退出轮询
            ElMessage({ type: 'error', message: '您的账号在别处登陆' })
            clearTimeout(this.timeint)
            loginOut(orgid)
          }
        }, timeout)
      }
      authquery()
    } catch (e) {
      return Promise.reject(e)
    }
  }
  stop() {
    this.runing = false
    this.timeint && clearTimeout(this.timeint)
  }
}

export { loginOut, PollingAuth }
