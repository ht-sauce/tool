import Client from './client'

// 判断当前处于什么设备平台
export function JudgmentPlatform() {
  const { system } = Client()
  const { iphone, ipod, ipad, ios, android, nokiaN, winMobile } = system
  // console.log(system)
  // 平板返回
  if (ipad) return 'ipad'
  // 手机端返回
  if (iphone || ipod || ios || android || nokiaN || winMobile) return 'mobile'
  // 都不是则返回pc
  return 'pc'
}
// 判断横屏还是竖屏
export function orientation() {
  const clientWidth = document.documentElement.clientWidth
  const clientHeight = document.documentElement.clientHeight
  // 横
  if (clientWidth >= clientHeight) return 'vertical'
  else return 'transverse' // 竖
}

export function usePlatform() {
  const type = JudgmentPlatform()
  const platform = {
    mobile: 'mobile',
    ipad: 'ipad',
    pc: 'pc',
  }
  const vt = orientation()

  // let p = platform[type]
  // if (vt === 'transverse' && type !== 'pc') p = platform.mobile

  return {
    orientation: vt, // 横竖屏
    platform: platform[type], // 手机，平板，电脑
  }
}
