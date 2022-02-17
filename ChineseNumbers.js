// 中文数字转换
const SimplifiedNums = {
  0: '零',
  1: '一',
  2: '二',
  3: '三',
  4: '四',
  5: '五',
  6: '六',
  7: '七',
  8: '八',
  9: '九',
}
const TraditionalChineseNums = {
  0: '零',
  1: '壹',
  2: '贰',
  3: '叁',
  4: '肆',
  5: '伍',
  6: '陆',
  7: '柒',
  8: '捌',
  9: '玖',
}

// 数字转中文
export function numToChina(num, isSimple = true) {
  num = String(num)
  if (!num) return ''
  const nums = num.split('')
  let str = ''
  nums.forEach((li) => {
    const toN = isSimple === true ? SimplifiedNums[li] : TraditionalChineseNums[li]
    str = str + toN
  })

  return str
}
