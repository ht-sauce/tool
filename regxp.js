// 正则表达式收集

// 验证网址开头的字符
export function isExternal(path) {
  return /^(https:\/\/|mailto:|tel:|http:\/\/)/.test(path)
}
// 数字或者零
export const zeroOrNumber = (value) => /^([0-9]*)$/.test(value)
// 验证手机号
export const checkPhone = (val) =>
  /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(val)
// 验证汉字
export const chineseChar = (str) => /[\u4E00-\u9FA5]/g.test(str)
// 匹配数字和特殊字符
export const numberOrChar = (str) =>
  /^[0-9  \!\@\#\$\^\&\*\-\_\+\=\:\\\'\;\,\.\/\?\(\)\{\}\[\]\<\>]*$/g.test(str)
// 只能输入指定小数位数的数字
export const decimalLen = (str, len = 2) => {
  return new RegExp(`^\d+(.\d{1,${len})?$`, 'g').test(str)
}
// 只能输入数字和小数点，不限制小数点位置
export const numOrPoint = (str) => /^[0-9]{0}([0-9]|[.])*$/g.test(str)
