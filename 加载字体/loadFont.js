//加载字体文件
// 字体名称需要转unicode码否则在canvas等情况下字体展示不正确
class LoadFontList {
  // 开始加载字体
  async load() {
    try {
      const fontList = [
        this.loadFont({
          cssValue: 'SY-Bold', // SY-Bold
          url: '/nbs-pc/comfonts/SourceHanSansCN-Bold.otf',
        }),
        this.loadFont({
          cssValue: 'SY-Regular', // SY-Regular
          url: '/nbs-pc/comfonts/SourceHanSansCN-Regular.ttf',
        }),
        this.loadFont({
          cssValue: 'SY-Heavy', // SY-Heavy
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
  loadFont(obj = { cssValue: null, url: null }) {
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
