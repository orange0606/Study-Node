// 1.导入 express
const express = require('express');
// 2.创建 Web 服务器
const app = express();

// 3.调用 app.listen(端口号, 启动成功后的回调函数)，启动服务器
app.listen(80, () => {
  console.log('express server running at http://127.0.0.1:80')
})

// 监听GET、POST请求
// 参数1： 客户端请求 URL 地址
// 参数2：请求对应的处理函数
  //  req：请求对象（包含了与请求相关的属性与方法）
  //  res：响应对象（包含了与响应相关的属性与方法）
// app.get('请求URL', function (req, res) {/** 处理函数 */})
// app.post('请求URL', function (req, res) {/** 处理函数 */})

// 4.监听客户端GET、POST请求，并向客户端吧响应具体的内容
// 通过res.send()方法，可以把处理好的内容，发送给客户端:
// res.send() 方法的参数 可是对象，也可以是字符串
app.get('/user', function (req, res) {
  // 调用 express 提供的 res.send() 方法，向客户端发送 JSON 对象
  res.send({ name: '小熊猫', age: 2, gender: '男猫' })
})
app.post('/user2', function (req, res) {
  // 调用 express 提供的res.send() 方法，向客户端响应一个 文本字符串
  res.send('请求成功：狗汤圆')
})
// 5. 在线接口测试postman工具： https://web.postman.co/

// 6.获取 URL 中携带的查询参数
// 通过 req.query 对象，可以访问到客户端通过查询字符粗的形式，发送到服务器的参数：
// 浏览器中访问 http://10.1.1.71/?name=zs&age=18
app.get('/', function (req, res) {
  // req.query 默认是一个空对象
  // 客户端使用?name=zs&age=20 这种查询字符串形式，发送到服务器的参数,可以通过 req.query 对象访问到，例如：
  // req.query.name  req.query.age
  console.log(req.query)
  res.send(req.query)
})

// 7.获取 URL 中携带的动态参数
// 通过 req.params 对象，可以访问到 URL 中，通过 ":" (冒号)匹配到的动态参数：
// 浏览器中访问 http://10.1.1.71/user/222
// 这里的 :id 是一个动态参数
// 接口 /user/:id/:username  浏览器访问 /user/9527/hhp, 最终的 req.params 为 { id:9527, username: 'hhp' }
app.get('/user/:id', function (req, res) {
  // req.params 默认是一个空对象,里面存放着通过 ":" (冒号)动态匹配到的参数值
  // 客户端使用/user/2 这种查询字符串形式，发送到服务器的参数,可以通过 req.params 对象访问到，例如：req.params.id
  console.log(req.params)
  res.send(req.params)
})

// 8.托管静态资源
// express.static()
// express 提供了一个非常好用的函数，叫做express.static(), 通过它，我们可以非常方便地创建一个静态资源服务器；
// 例如，通过如下代码就可以将 public 目录下的图片、CSS文件、JavaScript 文件对外开放了:
app.use(express.static('./public'));
// 现在，就可以访问public目录中的所有文件了：
// http://localhost:80/cat.jpg
// http://localhost:80/《第二册》.pdf

// 注意：Express 在指定的静态目录中查找文件，并对外提供资源的路径。因此，存放静态文件的目录名不会出现在 URL 中

// 9.托管多个静态资源目录
// 如果要托管多个静态资源目录，则多次调用 express.static() 函数
// 注意：访问静态资源文件时，express.static() 函数会根据目录添加顺序查找所需的文件。（相当于把多个目录合并为1个）

// 例如，通过如下代码就可以将 public和files 目录下的图片、CSS文件、JavaScript 文件对外开放了:
app.use(express.static('./public'));
app.use(express.static('./files'));

// 10.挂载路径前缀
// 如果希望在托管的静态资源访问路径之前，挂载路径前缀，则可以使用如下的方式；
app.use('/public', express.static('./public'));
// 现在就可以通过带有 /public 前缀地址来访问 public 目录中的文件了：
// http://localhost:80/public/cat.jpg
// http://localhost:80/public/《第二册》.pdf
