import { priceCheck } from '@/views/order/order-details/apis/orderDetails'

export default function OrderServer(ajax, config) {
  return {
    // 订单状态列表接口,http://wiki.cits.com.cn/pages/viewpage.action?pageId=11185900
    statusList: (opt) => {
      return ajax({
        url: '/order/config/status-list',
        method: 'get',
        ...opt,
      })
    },
    // 查询订单取消原因
    cancelReason: (opt) => {
      return ajax({
        url: '/order/config/cancel-reason',
        method: 'get',
        ...opt,
      })
    },
    // 订单列表
    orderList: {
      query: (opt) =>
        ajax({
          url: '/order/list',
          method: 'post',
          ...opt,
        }),
    },
    // 订单价格
    orderPrice: (opt) =>
      ajax({
        url: '/order/price/summary',
        method: 'get',
        ...opt,
      }),
    // 取消订单
    orderCancel: (opt) =>
      ajax({
        url: '/order/cancel',
        method: 'post',
        isResponse: true,
        ...opt,
      }),
    // 获取取消订单范围
    getOrderCancelScope: (opt) =>
      ajax({
        url: '/order/resource/cancellable-type/list',
        method: 'post',
        ...opt,
      }),
    // 发起对客取消
    actionCancellation: (opt) =>
      ajax({
        url: '/order/cancel-for-customer',
        method: 'post',
        ...opt,
      }),
    // 出团通知
    travelInform: {
      info: (opt) =>
        ajax({
          url: '/travel-inform',
          method: 'get',
          ...opt,
        }),
      // 重新制作出团模板、出团重发
      msgUpdate: (opt) =>
        ajax({
          url: '/travel-inform/update',
          method: 'post',
          ...opt,
        }),
    },
    // 订单支付
    pay: {
      // 收款列表
      collection: (opt) =>
        ajax({
          url: '/receipts/list',
          method: 'post',
          ...opt,
        }),
      // 退款列表
      refund: (opt) =>
        ajax({
          url: '/refund/list',
          method: 'post',
          ...opt,
        }),
      //  接口-支付开关操作
      switchStatus: (opt) =>
        ajax({
          url: '/receipts/switch',
          method: 'post',
          ...opt,
        }),
      // 支付开关校验
      switchStatusCheck: (opt) =>
        ajax({
          url: '/receipts/open-switch-check',
          method: 'post',
          ...opt,
        }),
    },
    // 出游需求附加项部分
    additional: {
      list: (opt) =>
        ajax({
          url: '/additional/list',
          method: 'post',
          ...opt,
        }),
      edit: (opt) =>
        ajax({
          url: '/additional/edit',
          method: 'post',
          ...opt,
        }),
      add: (opt) =>
        ajax({
          url: '/additional/add',
          method: 'post',
          ...opt,
        }),
      del: (opt) =>
        ajax({
          url: '/additional/delete',
          method: 'post',
          ...opt,
        }),
    },
    // 签约合同信息
    contract: {
      // 合同信息查看
      queryContract: (opt) =>
        ajax({
          url: '/sign/contract-url',
          method: 'get',
          ...opt,
        }),

      // 签约信息查询
      signQuery: (opt) =>
        ajax({
          url: '/sign/query',
          method: 'get',
          ...opt,
        }),
    },
    // 验价
    priceCheck: (opt) =>
      ajax({
        url: '/price-check',
        method: 'post',
        isResponse: true,
        ...opt,
      }),

    // 签约收款前的校验
    checkSignUpForPayment: (opt) =>
      ajax({
        url: '/order/requirement-confirm/complete-check',
        method: 'post',
        isResponse: true,
        ...opt,
      }),
    checkAdultFlightCount: (opt) =>
      ajax({
        url: '/order/requirement-confirm/check-adult-flight-count',
        method: 'post',
        isResponse: true,
        ...opt,
      }),
    checkAdultCount: (opt) =>
      ajax({
        url: '/order/requirement-confirm/check-adult-count',
        method: 'post',
        isResponse: true,
        ...opt,
      }),
    checkHotelAndFlightDate: (opt) =>
      ajax({
        url: '/order/requirement-confirm/check-hotel-and-flight-date',
        method: 'post',
        isResponse: true,
        ...opt,
      }),
  }
}
