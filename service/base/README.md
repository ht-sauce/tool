## axiosAjax.js    所有的函数基础，所有函数都继承该函数  
###axiosPkg  最初始函数  
```
url = '',
loading = false, //加载拦截  
baseURL = '',  
data = {},  
headers = { 'Content-Type': 'application/json;charset=UTF-8' }, //头部信息处理  
method = 'get',  
timeout = 30 * 1000,
```

###upload.js 上传文件函数封装
函数有一定局限性（内部会自主创建input元素），主要是针对那些页面上面直接点击上传情况（不写input元素），并且不需要用elementui的上传组件  
如果需要那种既可以预览文件，然后过一会再上传，请自己另行实现  
参数
```$xslt
(
ajax, // 内部是控制项和一些操作封装，需要传入一个基础ajax函数形成完整的函数
{
options.baseURL = '' //个人处理，需要兼容之前的elementui等插件的上传
options.fdata = options.fdata || '' //文件上传的url拼接地址
options.success = options.success || '文件上传成功'
options.url = options.url + new_url(options.fdata)
options.loading = options.loading || '文件上传中'

options.headers = options.headers || {}
options.headers['Content-Type'] = 'multipart/form-data'

options.method = 'post'
options.multiple = options.multiple || false //是否多文件,默认false
//文件类型验证,注意传入数组,默认["image/jpeg", "image/png"]
options.type = options.type || ['image/jpeg', 'image/png']
options.size = options.size || 5 //文件大小限制,默认5M大小
options.max = options.max || 5 //最多上传几个文件
}
)
```