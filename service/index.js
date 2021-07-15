import { BaseApi } from './couplingAjax'
import config from './config'

import Nbs from './apis/Nbs'

// 针对不同服务进行差异化定制
const nbs = (opt) =>
  BaseApi(opt, {
    prefix: config.gateway, // 路径前缀
    dataField: 'data', // 取值字段
    codeField: 'success', // 判断正确错误字段
    codeNum: true, // 返回是否正确取值
    msgField: 'message', // 提示信息获取
  })

export default {
  Nbs: Nbs(nbs, config),
}
