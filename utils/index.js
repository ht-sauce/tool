// 最简单的深拷贝
export function copy(p) {
  return JSON.parse(JSON.stringify(p))
}
// 利用a标签下载东西
export function Download(url) {
  if (!url) return false
  let a = document.createElement('a')
  a.href = url
  a.download = url
  a.click()
  a = null
}

export function getUUID() {
  return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}
