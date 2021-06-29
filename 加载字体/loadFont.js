//加载字体文件
// 字体名称需要转unicode码否则在canvas等情况下字体展示不正确
class LoadFontList {
  // 开始加载字体
  async load() {
    try {
      const fontList = [
        this.loadFont({
          cssValue: '\u0053\u0059\u002d\u0042\u006f\u006c\u0064', // SY-Bold
          url: '/nbs-pc/comfonts/SourceHanSansCN-Bold.otf',
        }),
        this.loadFont({
          cssValue: '\u0053\u0059\u002d\u0052\u0065\u0067\u0075\u006c\u0061\u0072', // SY-Regular
          url: '/nbs-pc/comfonts/SourceHanSansCN-Regular.ttf',
        }),
        this.loadFont({
          cssValue: '\u0053\u0059\u002d\u0048\u0065\u0061\u0076\u0079', // SY-Heavy
          url: '/nbs-pc/comfonts/SourceHanSerifCN-Heavy-4.otf',
        }),
      ]
      const font = await Promise.all(fontList)
      for (let i = 0; i < font.length; i++) {
        font[i] && document.fonts.add(font[i])
      }

      return Promise.resolve(true)
    } catch (e) {
      return Promise.reject(e)
    }
  }
  // obj格式,cssValue为自定义字体的名字,url为自定义字体的文件路径
  loadFont(obj = { cssValue: 'SY-Bold', url: '/comfonts/SourceHanSansCN-Regular.ttf' }) {
    if (document.fonts && !this.checkFont(obj.cssValue)) {
      let fontFace = new FontFace(
        obj.cssValue,
        `local('${obj.cssValue}'),url('${obj.url}') format('ttf'),url('${obj.url}')`,
      )
      return fontFace.load()
    } else {
      return new Promise(resolve => resolve(false))
    }
  }
  //检测字体文件是否已加载
  checkFont(name) {
    let values = document.fonts.values()
    let isHave = false
    let item = values.next()
    while (!item.done && !isHave) {
      let fontFace = item.value
      if (fontFace.family === name) {
        isHave = true
      }
      item = values.next()
    }
    return isHave
  }
}

export default LoadFontList
