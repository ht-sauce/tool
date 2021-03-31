export default class CustomizeLifecycle {
  // 由于强制横屏的问题，并且单页面统一都在id为app的div下，所以监听appDiv即可
  domApp = document.getElementById('app')
  constructor({
    onShow = () => {}, // 页面显示
    onHide = () => {}, // 页面隐藏
    onPullDownRefresh = () => {}, //监听用户下拉动作
    onReachBottom = () => {}, // 页面滚动到底部的事件
    onPageScroll = () => {}, // 监听页面滚动
    onBackPress = () => {}, // 监听页面返回,监听返回按键
    // vue生命周期传入
    onBeforeUnmount = null, // vue页面注销生命周期
    onMounted = null, // vue页面加载生命周期
  }) {
    this.onShow = onShow
    this.onHide = onHide
    this.onPullDownRefresh = onPullDownRefresh
    this.onReachBottom = onReachBottom
    this.onPageScroll = onPageScroll
    this.onBackPress = onBackPress

    if (!onBeforeUnmount || !onMounted) return null
    onMounted(() => {
      this.Start()
    })
    onBeforeUnmount(() => {
      this.Stop()
    })
  }
  Start() {
    // 注入全局生命周期，显示/隐藏
    document.addEventListener('visibilitychange', this._ShowHide)
    this.domApp.addEventListener('scroll', this._OnScroll)
  }
  Stop() {
    document.removeEventListener('visibilitychange', this._ShowHide)
    this.domApp.removeEventListener('scroll', this._OnScroll)
  }
  _ShowHide = (e) => {
    if (document.visibilityState === 'visible') this.onShow(e)
    else this.onHide(e)
  }
  _currentScroll = 0 // 当前滚动距离
  _OnScroll = () => {
    const domApp = this.domApp
    const clientHeight = domApp.clientHeight
    const contentHeight = domApp.scrollHeight //内容高度
    const scrollTop = domApp.scrollTop // 滚动距离

    const scollType = scrollTop >= this._currentScroll ? 'down' : 'up'

    const BottomDistance = contentHeight - clientHeight - scrollTop
    // 页面滚动事件
    this.onPageScroll({
      dom: domApp,
      clientHeight,
      contentHeight,
      scrollTop,
      PercentageDown: scrollTop / (contentHeight - clientHeight), // 向下滚动百分比
      BottomDistance: BottomDistance, // 底部距离，px
    })

    //到达底部10px时,页面滚动到底部的事件
    if (scollType === 'down' && BottomDistance <= 10) this.onReachBottom()

    this._currentScroll = scrollTop
  }
}
