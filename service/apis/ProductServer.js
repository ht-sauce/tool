export default function ProductServer(ajax, config) {
  const { domainName, ProductServer } = config
  return {
    product: {
      // excel批量导入产品
      upload: `${domainName + ProductServer}/product/import-excel`, // elementUI地址所需
      // 产品批量导入模板下载
      download: (opt) =>
        ajax({
          url: `/product/download-template`,
          method: 'get',
          file: true,
          responseType: 'blob',
          ...opt,
        }),
      // 产品列表
      list: (opt) =>
        ajax({
          url: '/products',
          method: 'get',
          ...opt,
        }),
      add: (opt) =>
        ajax({
          url: '/product/add',
          method: 'post',
          ...opt,
        }),
      // 修改产品
      update: (opt) =>
        ajax({
          url: '/product/update',
          method: 'post',
          ...opt,
        }),
      // 根据ID查询产品信息
      info: (opt) =>
        ajax({
          url: `/product/${opt.c_productId}`,
          method: 'get',
          ...opt,
        }),
      // 产品操作日志查询
      logs: (opt) =>
        ajax({
          url: `/product/logs`,
          method: 'get',
          ...opt,
        }),
      // 单个上下架
      upStatus: (opt) =>
        ajax({
          url: `/product/update-status`,
          method: 'post',
          ...opt,
        }),
      // 批量上下架
      batchUpStatus: (opt) =>
        ajax({
          url: `/product/batch-update-status`,
          method: 'post',
          ...opt,
        }),
    },
  }
}
