// 全角转半角
export function ToCDB(str) {
  let tmp = ''
  for (let i = 0; i < str.length; i++) {
    if (str.charCodeAt(i) > 65248 && str.charCodeAt(i) < 65375) {
      tmp += String.fromCharCode(str.charCodeAt(i) - 65248)
    } else {
      tmp += String.fromCharCode(str.charCodeAt(i))
    }
  }
  return tmp
}
// 半角转全角
function ToDBC(txtstring) {
  let tmp = ''
  for (let i = 0; i < txtstring.length; i++) {
    if (txtstring.charCodeAt(i) == 32) {
      tmp = tmp + String.fromCharCode(12288)
    } else if (txtstring.charCodeAt(i) < 127) {
      tmp = tmp + String.fromCharCode(txtstring.charCodeAt(i) + 65248)
    }
  }
  return tmp
}
