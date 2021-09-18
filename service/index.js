import { BaseApi } from './couplingAjax'
import config from './config'

import Nbs from './apis/Nbs'
import CategoryServer from './apis/CategoryServer'
import IntentionServer from './apis/IntentionServer'
import OrderServer from './apis/OrderServer'
import ProductServer from './apis/ProductServer'
import BaseServer from './apis/BaseServer'
import Wiki from './apis/Wiki'
import ConfirmServer from './apis/ConfirmServer'
import AuthServer from './apis/AuthServer'
import AdapterServer from './apis/AdapterServer'
import CommissionServer from './apis/CommissionServer'

// 所有微服务https://sit-private-api.cits.com.cn/nbs/doc.html

// 针对不同服务进行差异化定制
const nbs = (opt) =>
  BaseApi(opt, {
    prefix: config.gateway, // 路径前缀
    dataField: 'data', // 取值字段
    codeField: 'success', // 判断正确错误字段
    codeNum: true, // 返回是否正确取值
    msgField: 'message', // 提示信息获取
    tipsCode: 'errorCode', // 错误号
  })
// 后端服务汇总地址：https://sit-private-api.cits.com.cn/nbs/doc.html

// 类目系统: http://sit-private-api.cits.com.cn/nbs/category-server/doc.html
const categoryServer = (opt) => BaseApi(opt, { prefix: config.CategoryServer })
// 意向单服务: http://sit-private-api.cits.com.cn/nbs/intention-server/doc.html
const intentionServer = (opt) => BaseApi(opt, { prefix: config.IntentionServer })
// 订单服务 http://sit-private-api.cits.com.cn/nbs/order-server/doc.html
const orderServer = (opt) => BaseApi(opt, { prefix: config.OrderServer })
// 产品服务: http://sit-private-api.cits.com.cn/nbs/product-server/doc.html
const productServer = (opt) => BaseApi(opt, { prefix: config.ProductServer })
// 公共服务: http://sit-private-api.cits.com.cn/nbs/base-server/doc.html
const baseServer = (opt) => BaseApi(opt, { prefix: config.BaseServer })
// 知识库 http://sit-private-api.cits.com.cn/nbs/kbr-server/doc.html
const wiki = (opt) => BaseApi(opt, { prefix: config.Wiki })
// 确认管理 http://sit-private-api.cits.com.cn/nbs/confirm-server/doc.html
const confirmServer = (opt) => BaseApi(opt, { prefix: config.ConfirmServer })
// 授权服务 http://sit-private-api.cits.com.cn/nbs/auth-server/doc.html
const authServer = (opt) => BaseApi(opt, { prefix: config.AuthServer })
// 适配服务: http://sit-private-api.cits.com.cn/nbs/adapter-server/doc.html
const adapterServer = (opt) => BaseApi(opt, { prefix: config.AdapterServer })
// 佣金管理 https://sit-private-api.cits.com.cn/nbs/commission-server/doc.html
const commissionServer = (opt) => BaseApi(opt, { prefix: config.CommissionServer })

export default {
  Nbs: Nbs(nbs, config),
  categoryServer: CategoryServer(categoryServer, config),
  IntentionServer: IntentionServer(intentionServer, config),
  OrderServer: OrderServer(orderServer, config),
  ProductServer: ProductServer(productServer, config),
  BaseServer: BaseServer(baseServer, config),
  Wiki: Wiki(wiki, config),
  ConfirmServer: ConfirmServer(confirmServer, config),
  AuthServer: AuthServer(authServer, config),
  AdapterServer: AdapterServer(adapterServer, config),
  CommissionServer: CommissionServer(commissionServer, config),
}
