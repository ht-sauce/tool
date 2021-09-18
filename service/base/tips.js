import { Message } from 'element-ui'

// import { checkAnswer } from '@/utils/jumpToSolution'

// 统一message
const customMessage = async ({ msg = '', type = 'success', tipsCode = '' }) => {
  if (!msg) return null
  if (!tipsCode) {
    Message({
      message: msg,
      type,
      showClose: true,
    })
  }
  if (tipsCode) {
    Message({
      dangerouslyUseHTMLString: true,
      message: `${msg} <a href="/nbs-pc/#/wiki-search?name=${tipsCode}" style="color: #409EFF;" target="_blank">更多帮助</a>`,
      type,
      showClose: true,
    })
    // let showTip = await checkAnswer(tipsCode)
    // if (showTip) {
    //   Message({
    //     dangerouslyUseHTMLString: true,
    //     message: `${msg} <a href="/nbs-pc/#/wiki-search?name=${tipsCode}" style="color: #409EFF;" target="_blank">更多帮助</a>`,
    //     type,
    //     showClose: true,
    //   })
    // } else {
    //   Message({
    //     message: msg,
    //     type,
    //     showClose: true,
    //   })
    // }
  }
}

// 消息提示
const Tips = {
  success(opt = {}) {
    customMessage({ type: 'success', ...opt })
  },
  error(opt = {}) {
    customMessage({ type: 'error', ...opt })
  },
}

export default Tips
