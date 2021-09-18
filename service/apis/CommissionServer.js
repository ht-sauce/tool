export default function CommissionServer(ajax, config) {
  const { domainName, CommissionServer } = config
  return {
    // 查询佣金规则列表
    queryCommissionRulesList: (opt) =>
      ajax({
        url: '/rules',
        method: 'GET',
        ...opt,
      }),
    // 根据佣金规则ID查询日志表数据
    queryCommissionRulesLog: (opt) => {
      const url = `/rules/log/${opt.data}`
      return ajax({
        url,
        method: 'GET',
      })
    },
    // 查询全部类目数据
    queryAllCategories: (opt) =>
      ajax({
        url: '/rules/categorys',
        method: 'GET',
        ...opt,
      }),
    // 获取佣金规则回显数据
    queryCommissionRulesInfo: (opt) => {
      const url = `/rules/${opt.data}`
      return ajax({
        url,
        method: 'GET',
      })
    },
    // 修改佣金规则的状态
    modifyRulesStatus: (opt) =>
      ajax({
        url: '/rules/update-status',
        method: 'PATCH',
        ...opt,
      }),
    // 添加佣金规则
    addRules: (opt) =>
      ajax({
        url: '/rules',
        method: 'POST',
        ...opt,
      }),
    // 修改佣金规则
    modifyRules: (opt) =>
      ajax({
        url: '/rules',
        method: 'PUT',
        ...opt,
      }),

    // 查询佣金账单列表
    queryBillList: (opt) =>
      ajax({
        url: '/bill/list',
        method: 'POST',
        ...opt,
      }),
    // 佣金账单列表-佣金发放
    billTransfer: (opt) =>
      ajax({
        url: '/bill/transfer',
        method: 'POST',
        ...opt,
      }),
    // 佣金账单明细-统计
    billDetailStatistics: (opt) =>
      ajax({
        url: '/bill/detail-statistics',
        method: 'POST',
        ...opt,
      }),
    // 佣金账单明细-明细列表
    billDetailList: (opt) =>
      ajax({
        url: '/bill/detail-list',
        method: 'POST',
        ...opt,
      }),
    // 佣金明细列表查询
    queryWorkFormList: (opt) =>
      ajax({
        url: '/workform/query-list',
        method: 'POST',
        ...opt,
      }),
    // 佣金账单明细导出
    billExportDetail: {
      upload: `${domainName + CommissionServer}/bill/export-detail`,
      download: (opt) =>
        ajax({
          url: `/bill/export-detail`,
          method: 'get',
          file: true,
          responseType: 'blob',
          ...opt,
        }),
    },
    // 订单佣金明细导出
    orderCommissionExport: {
      upload: `${domainName + CommissionServer}/order/commission/export`,
      download: (opt) =>
        ajax({
          url: `/order/commission/export`,
          method: 'get',
          file: true,
          responseType: 'blob',
          ...opt,
        }),
    },
  }
}
