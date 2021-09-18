export default function AdapterServer(ajax, config) {
  return {
    query: (opt) =>
      ajax({
        url: '/its/room/list',
        method: 'POST',
        ...opt,
      }),
  }
}
