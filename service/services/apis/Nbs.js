export default function Nbs(ajax) {
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
  }
}
