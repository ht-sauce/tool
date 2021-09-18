export default function IntentionServer(ajax, config) {
  const { domainName, IntentionServer } = config
  return {
    query: (opt) =>
      ajax({
        url: '/list',
        method: 'GET',
        ...opt,
      }),
    add: (opt) =>
      ajax({
        url: '/add',
        method: 'post',
        ...opt,
      }),
    // 修改意向单状态为无效
    updateStatus: (opt) =>
      ajax({
        url: '/update-status',
        method: 'post',
        ...opt,
      }),
    // 查询id
    queryID: (opt) =>
      ajax({
        url: `/${opt.c_id}`,
        method: 'get',
        ...opt,
      }),
    // 保存意向单跟进信息并下单
    saveSpeed: (opt) =>
      ajax({
        url: '/update',
        method: 'post',
        ...opt,
      }),
    // 根据意向单ID查询备注信息
    queryRemake: (opt) =>
      ajax({
        url: `/memo/${opt.orderIntentionId}`,
        method: 'get',
        ...opt,
      }),
    // 导出意向单列表
    listExport: {
      upload: `${domainName + IntentionServer}/download-intention-list`,
      download: (opt) =>
        ajax({
          url: `/download-intention-list`,
          method: 'get',
          file: true,
          responseType: 'blob',
          ...opt,
        }),
    },
  }
}
