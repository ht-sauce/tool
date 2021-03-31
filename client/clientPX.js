// 根据px判断是手机端，pc，平板
export default function clientPX() {
  const width = window.screen.width
  if (width <= 600) {
    return 'mobile'
  }
  if (width > 600 && width < 960) {
    return 'ipad'
  }

  return 'pc'
}
