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
