export default function Nbs(ajax, config) {
  return {
    login: (opt) =>
      ajax({
        url: '/login',
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        ...opt,
      }),
    logout: (opt) =>
      ajax({
        url: '/logout',
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        ...opt,
      }),
    // 海报登录账号接口
    posterLogin: (opt) =>
      ajax({
        reLogin: false,
        url: '/token/open-api/old-user',
        method: 'post',
        ...opt,
      }),
  }
}
