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

function defineRem(p) {
  const html = document.getElementsByTagName('html')[0]
  // 平板拆分为1024份
  if (p === 'ipad') html.style.fontSize = `calc(100vw / 1024)`
  // 手机拆分为750
  if (p === 'mobile') html.style.fontSize = `calc(100vw / 750)`
  // 平板强制横屏
  const HorizontalScreen = () => {
    const app = document.getElementById('app')
    const width = document.documentElement.clientWidth
    const height = document.documentElement.clientHeight
    app.style.transition = 'transform 0.3s'
    const v = orientation()
    // 竖屏的时候强制横屏
    if (v === 'transverse' && p === 'ipad') {
      app.style.width = height + 'px'
      app.style.height = width + 'px'
      app.style.top = (height - width) / 2 + 'px'
      app.style.left = 0 - (height - width) / 2 + 'px'

      app.style.transform = 'rotate(90deg)'
      app.style.transformOrigin = '50% 50%'
      html.style.fontSize = `calc(100vh / 1024)`
    } else {
      // 横屏的时候复原
      app.style.width = width + 'px'
      app.style.height = height + 'px'
      app.style.top = 0
      app.style.left = 0
      app.style.transition = 'rotate(0deg)'
      app.style.transform = 'none'
      app.style.transformOrigin = '50% 50%'
      html.style.fontSize = `calc(100vw / 1024)`
    }
  }
  HorizontalScreen()
  window.addEventListener('resize', HorizontalScreen)
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

  const p = platform[type]
  defineRem(p)

  return {
    orientation: vt, // 横竖屏
    platform: p, // 手机，平板，电脑
  }
}
