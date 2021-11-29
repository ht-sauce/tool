// 下非同源的图片等文件
export function noHomologyDownload(src, name) {
  if (!src) return false

  const x = new XMLHttpRequest()
  //禁止浏览器缓存；否则会报跨域的错误
  x.open('GET', src + '?t=' + new Date().getTime(), true)
  x.responseType = 'blob'
  x.onload = function (e) {
    const url = window.URL.createObjectURL(x.response)
    let a = document.createElement('a')
    a.href = url
    a.download = name ?? src
    a.click()
    a = null
  }
  x.send()
}
// 同源下载
export function HomologyDownload(url, name) {
  if (!url) return false

  let a = document.createElement('a')
  a.target = '_blank'
  a.download = name ?? url
  a.href = url // 非同源地址会跳转新页面
  a.click()
  a = null
}

// 文件下载需要是blob类型
export const fileDownload = (response) => {
  if (!response) return null
  const filename = response.headers['content-disposition']
  const blob = response.data
  const downloadElement = document.createElement('a')
  const href = window.URL.createObjectURL(blob)
  downloadElement.href = href
  downloadElement.download = decodeURIComponent(filename.split("filename*=utf-8''")[1])
  document.body.appendChild(downloadElement)
  downloadElement.click()
  document.body.removeChild(downloadElement)
  window.URL.revokeObjectURL(href)
}

// 选择文件
export function selectFile({ options = false, accept = [] } = {}) {
  return new Promise((resolve) => {
    let input = document.createElement('input')
    input.type = 'file'
    input.accept = accept.toString()
    options.multiple ? (input.multiple = 'multiple') : ''
    input.click()

    const remove = () => {
      input.removeEventListener('input', watchUpload, false)
      input = null
    }

    const watchUpload = (e) => {
      const file = e.path[0].files
      remove()
      resolve(file)
    }
    input.addEventListener('input', watchUpload, false)
  })
}
// 文件基础校验类
export const filesChecks = {
  // 文件数量限制
  len(files, max) {
    const len = files.length
    if (len > max) {
      return false
    } else return true
  },
  // 图片地址和是否本地图片
  async getImgSize(url, isLocal = true) {
    if (!url) return Promise.reject('图片地址不能为空')
    const image = new Image()

    if (isLocal) image.src = await this.getLocalImgUrl(url)
    else image.src = url

    return new Promise((resolve, reject) => {
      image.onload = () => {
        resolve({
          width: image.width,
          height: image.height,
        })
      }
      image.onerror = (imgEvent) => {
        reject(imgEvent)
      }
    })
  },
  // 获取本地图片url地址
  getLocalImgUrl(localFile) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (event) => {
        resolve(event.target.result)
      }
      reader.onerror = (e) => {
        reject(e)
      }
      reader.readAsDataURL(localFile)
    })
  },
  // 图片像素校验,这是一个promise函数
  async imgPx({ files = [], width = 375, height = 375, isLocal = true }) {
    try {
      for (let i = 0; i < files.length; i++) {
        const imgWh = await this.getImgSize(files[i], isLocal)
        if (imgWh.width < width || imgWh.height < height) return Promise.reject(false)
      }
      return Promise.resolve(true)
    } catch (e) {
      return Promise.reject(e)
    }
  },
  // 文件大小限制,按Mb计算
  size(files, size) {
    for (let i = 0; i < files.length; i++) {
      if (size === 0 || files[i].size / 1024 / 1024 > size) return false
    }
    return true
  },
  // 文件类型限制
  /*
   * img: 'image/jpeg', 'image/png'
   * execl: xls:'application/vnd.ms-excel',xlsx:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
   * */
  type(files, type = ['image/jpeg', 'image/png']) {
    for (let i = 0; i < files.length; i++) {
      if (type.length < 1 || !type.includes(files[i].type)) return false
    }
    return true
  },
}

// 跨域下载图片
export function noCorsImgDownload(imgUrl, imgName) {
  const x = new XMLHttpRequest()
  //禁止浏览器缓存；否则会报跨域的错误
  x.open('GET', imgUrl + '?t=' + new Date().getTime(), true)
  x.responseType = 'blob'
  x.onload = function (e) {
    const url = window.URL.createObjectURL(x.response)
    const a = document.createElement('a')
    a.href = url
    a.download = imgName
    a.click()
  }
  x.send()
}
