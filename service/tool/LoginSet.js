import vuex from '@/store'
import router from '@/router'
import services from '@/services'

export async function loginOut() {
  const out = () => {
    vuex.commit('user/CLEAR')
    vuex.commit('clear_data')
    const params = {
      path: '/login',
    }
    router.replace(params)
  }
  try {
    await services.Nbs.logout()
    out()
    return Promise.resolve(true)
  } catch (e) {
    out()
    return Promise.resolve(e)
  }
}
