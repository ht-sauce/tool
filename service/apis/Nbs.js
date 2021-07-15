export default function Nbs(ajax) {
  return {
    login: (opt) =>
      ajax({
        url: '/login',
        method: 'post',
        test: true,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        ...opt,
      }),
    logout: (opt) =>
      ajax({
        url: '/logout',
        test: true,
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        ...opt,
      }),
  }
}
