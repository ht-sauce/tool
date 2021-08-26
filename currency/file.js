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
export function selectFile({ options = false } = {}) {
  return new Promise((resolve) => {
    let input = document.createElement('input')
    input.type = 'file'
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
  // 文件大小限制,按Mb计算
  size(files, size) {
    for (let i = 0; i < files.len; i++) {
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
    for (let i = 0; i < files.len; i++) {
      if (type.length > 0 && !type.includes(files[i].type)) return false
    }
    return true
  },
}
