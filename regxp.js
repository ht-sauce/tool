// 正则表达式收集

// 验证网址开头的字符
export const isExternal = str => /^(https:\/\/|mailto:|tel:|http:\/\/)/.test(str)
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
  return new RegExp(`^[0-9]+(\.[0-9]{1,${len})?$`, 'g').test(str)
}
// 只能输入数字和小数点，不限制小数点位置
export const numOrPoint = (str) => /^[0-9]{0}([0-9]|[.])*$/g.test(str)
//大于零的整数
export const largeZeroInt = (str) => /^\+?[1-9]\d*$/g.test(str)
// 只能输入1-99
export const onnToInetyNine = (str) => /^[1-9][0-9]?$/g.test(str)
// 只能输入0.1到100的数字
export const zeroPointOneToOneHundred = (str) => /0\.[1-9]|^[1-9]?$|^[1-9][0-9]?$|100/g.test(str)
// 只能输入字母数字汉字和+-,()
export const zysStr = (str) => /^[A-Za-z0-9\u4e00-\u9fa5]+$|[+-,()]/g.test(str)
