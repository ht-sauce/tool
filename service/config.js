// 接口和页面初始化配置中心
// 在前置配置之前，需要搞清楚后端微服务前缀路由是什么，然后再配置到该文件下面
const gateway = '/nbs'
let service = {
  domainName: '', // 主域名
  gateway, // nbs是流量网关前缀,后面的才是微服务后端代码前缀
  CategoryServer: gateway + '/category-server', // 类目系统
  IntentionServer: gateway + '/intention-server/intention', // 订单意向单
  OrderServer: gateway + '/order-server', // 订单服务
  ProductServer: gateway + '/product-server', // 订单服务
  BaseServer: gateway + '/base-server', // 公共服务
  Wiki: gateway + '/kbr-server', // 知识库
  ConfirmServer: gateway + '/confirm-server', // 确认管理服务
  AuthServer: gateway + '/auth-server', // 修改密码用到
  AdapterServer: gateway + '/adapter-server', // 适配系统
  CommissionServer: gateway + '/commission-server', // 佣金系统
}
console.log('当前环境', process.env.VUE_APP_NODE_ENV)
switch (process.env.VUE_APP_NODE_ENV) {
  // 当走淘宝mock的情况
  case 'rapmock': {
    service = {
      ...service,
      domainName: '',
      nbs: '/app/mock/283382',
    }
    break
  }
  // 开发, 本地开发走vue代理
  case 'development': {
    service = {
      ...service,
      domainName: '',
    }
    break
  }
  // 测试环境
  case 'staging': {
    service = {
      ...service,
      domainName: '',
    }
    break
  }
  // 生产
  case 'production': {
    service = {
      ...service,
      domainName: '',
    }
    break
  }
}

export default service
