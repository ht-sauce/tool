// 适用于按钮点击上传场景
import Tips from './tips'

// 对uri地址进行数据拼接
const new_url = (obj) => {
  if (obj) {
    let fields = ''
    for (let key in obj) {
      fields = fields + `&${key}=${obj[key]}`
    }
    return '?' + fields.substring(1, fields.length)
  } else {
    return ''
  }
}

const paramsHandle = (options) => {
  options.baseURL = '' //个人处理，需要兼容之前的elementui等插件的上传
  options.fdata = options.fdata || '' //文件上传的url拼接地址
  options.success = options.success || '文件上传成功'
  options.url = options.url + new_url(options.fdata)
  options.loading = options.loading || '文件上传中'

  options.headers = options.headers || {}
  options.headers['Content-Type'] = 'multipart/form-data'

  options.method = 'post'
  options.multiple = options.multiple || false //是否多文件,默认false
  //文件类型验证,注意传入数组,默认["image/jpeg", "image/png"]
  options.type = options.type || ['image/jpeg', 'image/png']
  options.size = options.size || 5 //文件大小限制,默认5M大小
  options.max = options.max || 5 //最多上传几个文件
  return options
}

// 文件上传
const upload = (ajaxCallback, params) => {
  const options = paramsHandle(params)
  //文件验证处理
  let input = document.createElement('input')
  input.type = 'file'
  options.multiple ? (input.multiple = 'multiple') : ''
  input.click()

  return new Promise((suc, err) => {
    let type = options.type
    input.addEventListener('input', watchUpload, false)
    function watchUpload(event) {
      //console.log(event);
      //移除监听
      let remove = () => {
        input.removeEventListener('input', watchUpload, false)
        input = null
      }

      const file = event.path[0].files

      const len = file.length
      // 文件数量限制
      if (len > options.max) {
        remove()
        Tips.error({ msg: '文件个数超过' + options.max })

        err(file)
        return false
      }
      let formData = new FormData()
      for (let i = 0; i < len; i++) {
        // 文件大小限制
        if (options.size !== 0 && file[i].size / 1024 / 1024 > options.size) {
          remove()
          Tips.error({ msg: file[i].name + '文件超过' + options.size + 'M' })

          err(file[i])
          return false
        }
        // 文件类型限制
        if (type.length > 0 && !type.includes(file[i].type)) {
          remove()
          Tips.error({ msg: file[i].name + '文件类型为' + file[i].type })

          err(file)
          return false
        }
        formData.append('dhtUpload', file[i], file[i].name)
      }
      options.data = formData
      // 最终进行文件上传
      ajaxCallback(options)
        .then((e) => {
          suc(e)
        })
        .catch((e) => {
          err(e)
        })

      // 没有问题下，清空监听。
      remove()
    }
  })
}

export default upload
