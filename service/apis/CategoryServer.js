export default function category(ajax, config) {
  const { domainName, CategoryServer } = config
  return {
    // 类目上传下载
    categoryExecl: {
      upload: `${domainName + CategoryServer}/category/import-excel`, // elementUI地址所需
      download: (opt) =>
        ajax({
          url: `/category/download-template`,
          method: 'get',
          file: true,
          responseType: 'blob',
          ...opt,
        }),
    },
    // 目的地上传下载
    destinationExecl: {
      upload: `${domainName + CategoryServer}/destination-group/import-excel`,
      download: (opt) =>
        ajax({
          url: `/destination-group/download-template`,
          method: 'get',
          file: true,
          responseType: 'blob',
          ...opt,
        }),
    },
    categoryUpdate: (opt) =>
      ajax({
        url: `/category`,
        method: 'patch', // patch修改
        ...opt,
      }),
    categoryAdd: (opt) =>
      ajax({
        url: `/category`,
        method: 'post', // patch修改
        ...opt,
      }),
    // 根据参数查询一二级品类ID和名称
    productClassList: (opt) =>
      ajax({
        url: `/product-class-list`,
        method: 'post', // patch修改
        ...opt,
      }),
    // 目的地大类
    productLineTypes: (opt) =>
      ajax({
        url: `/product-line-types`,
        method: 'post', // patch修改
        ...opt,
      }),
    // 根据参数查询一级/二级目的地数据列表
    destinationList: (opt) =>
      ajax({
        url: `/destination-list`,
        method: 'post', // patch修改
        ...opt,
      }),
    // 根据前五级查询目的地名称列表
    destinationName: (opt) =>
      ajax({
        url: `/category/destination-name`,
        method: 'get', // patch修改
        ...opt,
      }),
  }
}
