import { ElNotification } from 'element-plus'

// 消息提示
const Tips = {
  success({ title = '', msg = '' }) {
    ElNotification({
      title,
      message: msg,
      type: 'success',
    })
  },
  error({ title = '', msg = '' }) {
    ElNotification({
      title,
      message: msg,
      type: 'error',
    })
  },
}

export default Tips
