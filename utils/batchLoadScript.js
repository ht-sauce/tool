/*
* 数组示例
* urls: [
*   {
*     url: 'js地址'，
*     id: 'id名称'
*   }
* ]
* */
// 批量加载js文件
export default async function batchLoadScript(urls) {
  if (!urls || urls.length < 1) return Promise.resolve()
  const loadjs = ({ url, id }) => {
    return new Promise((resolve, reject) => {
      // 移除旧js
      const oldjs = document.getElementById(id)
      oldjs && document.body.removeChild(id)
      // 加载新js
      const script = document.createElement('script')
      script.id = id
      script.type = 'text/javascript'
      script.src = url + `?time=${new Date().getTime()}`
      script.onload = function () {
        resolve()
      }
      document.head.appendChild(script)
    })
  }
  for (let i = 0; i < urls.length; i++) {
    await loadjs(urls[i])
  }
  return Promise.resolve()
}
