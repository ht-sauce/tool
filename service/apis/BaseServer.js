export default function BaseServer(ajax, config) {
  return {
    // 根据城市名称模糊搜索
    queryCityList: (opt) =>
      ajax({
        url: '/city/list',
        method: 'post',
        ...opt,
      }),

    // 查询商业区列表
    queryBusinessList: (opt) =>
      ajax({
        url: '/business/list',
        method: 'post',
        ...opt,
      }),

    // 查询行政区列表
    queryAreaList: (opt) =>
      ajax({
        url: '/area/list',
        method: 'post',
        ...opt,
      }),

    // 查询地铁站列表
    queryMetroList: (opt) =>
      ajax({
        url: '/metro/list',
        method: 'post',
        ...opt,
      }),
  }
}
