export default function Wiki(ajax, config) {
  const { domainName, Wiki } = config
  return {
    wiki: {
      list: (opt) =>
        ajax({
          url: '/knowledge/list',
          method: 'get',
          ...opt,
        }),
      add: (opt) =>
        ajax({
          url: '/knowledge/add',
          method: 'post',
          ...opt,
        }),
      delete: (opt) =>
        ajax({
          url: '/knowledge/delete',
          method: 'post',
          ...opt,
        }),
      update: (opt) =>
        ajax({
          url: '/knowledge/update',
          method: 'post',
          ...opt,
        }),
      detail: (opt) =>
        ajax({
          url: '/knowledge/get',
          method: 'get',
          ...opt,
        }),
    },
    question: {
      managerList: (opt) =>
        ajax({
          url: '/question/list4manager',
          method: 'get',
          ...opt,
        }),
      clientList: (opt) =>
        ajax({
          url: '/question/list4client',
          method: 'get',
          ...opt,
        }),
      info: (opt) =>
        ajax({
          url: '/question/get',
          method: 'get',
          ...opt,
        }),
      add: (opt) =>
        ajax({
          url: '/question/add',
          method: 'post',
          ...opt,
        }),
      del: (opt) =>
        ajax({
          url: '/question/delete',
          method: 'post',
          ...opt,
        }),
      update: (opt) =>
        ajax({
          url: '/question/update',
          method: 'post',
          ...opt,
        }),
    },
    upload: `${domainName + Wiki}/upload`,
  }
}
