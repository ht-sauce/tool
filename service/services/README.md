##基本说明
封装采用函数传入json格式数据,并且支持promise  
###couplingAjax.js
业务层次封装功能  
完成接口返回正确错误判断，也就是.then之后肯定是正确信息，不再需要每次书写都额外判断  
口令  
异常退出  
正确和错误处理  
application/x-www-form-urlencoded请求头处理  
服务前缀  
###所有可用参数,和默认值    
下述列出的参数是可配置覆盖的参数值，但是一般比如项目前缀等都已经封装好  
在api文件夹下面配置通常是返回一个函数  
基本配置如下  
```
const Nbs = ajax => {
  return {
    // 测试api，后期要删除
    ceshi: opt =>
      ajax({
        url: `/category-server/categorys`,
        method: 'post',
        ...opt
      })
  }
}
export default Nbs

```
####使用async await方式  
```
import service from '@/services'

    async test() {
      try {
        // 正确信息
        const res = await service.Nbs.ceshi({ 
          url = '', // url地址
          loading: false, //加载拦截loaing,可以传入字符串更换提示信息  
          baseURL: '',  // 基础路径前缀
          data: {},  // 不管是get还是post参数都放这里
          headers: { 'Content-Type': 'application/json;charset=UTF-8' }, //头部信息处理  
          method: 'get',  // 访问方式
          timeout: 30 * 1000, // 接口超时时间
          error: true, // 错误提示信息：可以传入字符串，传入字符串则不管什么提示都是该字符串提示
          success: false // 成功信息提示：可以传入字符串，传入字符串则不管什么提示都是该字符串提示
          })
        console.log(res)
      } catch (e) {
        // 错误信息统一都在这里
        console.log(e)
      }
    }
```
####非es7语法方式  
```
import service from '@/services'

    test() {
      service.Nbs.ceshi({
        // 参数信息，上述一致
      })
        .then(res => {
          console.log('正确信息', res)
        })
        .catch(e => {
          console.log('错误信息', e)
        })
    }
```