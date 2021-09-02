// 自动计算textarea高度，实现自动高度
export function calcTextareaHeight(el) {
  if (typeof el === 'string') {
    el = document.querySelector(el)
  }
  const attrs = ['box-sizing', 'padding-top', 'padding-bottom', 'border-top', 'border-bottom']
  let heightOffset = 0
  const style = window.getComputedStyle(el)
  const [boxSizing, paddingTop, paddingBottom, borderTop, borderBottom] = attrs.map((item) =>
    style.getPropertyValue(item),
  )
  if (boxSizing === 'content-box') {
    heightOffset = -parseFloat(paddingTop) - parseFloat(paddingBottom)
  } else {
    heightOffset = parseFloat(borderTop) + parseFloat(borderBottom)
  }
  return el.scrollHeight + heightOffset
}
