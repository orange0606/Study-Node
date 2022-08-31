# Study-Node

### nodemon(热更新)

https://www.npmjs.com/package/nodemon

在编写调试 Node.js 项目的时候，如果修改了项目的代码， 则需要频繁的手动 close 掉，然后再重新启动，非常繁琐。现在，我们可以使用 nodemon 这个工具，它能够监听项目文件的变动，当代码被修改后，nodemon 会自动帮我们重启项目，极大方便了开发和调试。

安装：
```
npm install -g nodemon
npm install nodemon --save
```
使用：

```
// 将node 命令 替换为 nodemon 命令，使用 nodemon app.js 来启动项目
nodemon app.js
```

### 在线接口测试postman工具： 

https://web.postman.co/

---
## 一、Node+ express

#### 1.Node+ express 的基本服务开启
```
// (1).导入 express
const express = require('express');

// (2).创建 Web 服务器
const app = express();

// (3).调用 app.listen(端口号, 启动成功后的回调函数)，启动服务器
app.listen(80, () => {
  console.log('express server running at http://127.0.0.1:80')
})
```

#### 2.监听GET、POST请求
参数1： 客户端请求 URL 地址

参数2：请求对应的处理函数

   req：请求对象（包含了与请求相关的属性与方法）
   res：响应对象（包含了与响应相关的属性与方法）
```
app.get('请求URL', function (req, res) {/** 处理函数 */})
app.post('请求URL', function (req, res) {/** 处理函数 */})
```

#### 3.监听客户端GET、POST请求，并向客户端吧响应具体的内容

通过res.send()方法，可以把处理好的内容，发送给客户端:

res.send() 方法的参数 可是对象，也可以是字符串
```
app.get('/user', function (req, res) {
  // 调用 express 提供的 res.send() 方法，向客户端发送 JSON 对象
  res.send({ name: '小熊猫', age: 2, gender: '男猫' })
})
app.post('/user2', function (req, res) {
  // 调用 express 提供的res.send() 方法，向客户端响应一个 文本字符串
  res.send('请求成功：狗汤圆')
})
```
#### 4.获取 URL 中携带的查询参数

通过 req.query 对象，可以访问到客户端通过查询字符粗的形式，发送到服务器的参数：
```
// 浏览器中访问 http://10.1.1.71/?name=zs&age=18
app.get('/', function (req, res) {
  // req.query 默认是一个空对象
  // 客户端使用?name=zs&age=20 这种查询字符串形式，发送到服务器的参数,可以通过 req.query 对象访问到，例如：
  // req.query.name  req.query.age
  console.log(req.query)
  res.send(req.query)
})
```

#### 5.获取 URL 中携带的动态参数

- 接口 /user/:id/:username  浏览器访问 /user/9527/hhp, 最终的 req.params 为 { id:9527, username: 'hhp' }
- 通过 req.params 对象，可以访问到 URL 中，通过 ":" (冒号)匹配到的动态参数：

```
// 浏览器中访问 http://10.1.1.71/user/222

// 这里的 :id 是一个动态参数
app.get('/user/:id', function (req, res) {
  // req.params 默认是一个空对象,里面存放着通过 ":" (冒号)动态匹配到的参数值
  // 客户端使用/user/2 这种查询字符串形式，发送到服务器的参数,可以通过 req.params 对象访问到，例如：req.params.id
  console.log(req.params)
  res.send(req.params)
})
```

#### 6.托管静态资源
express.static()

express 提供了一个非常好用的函数，叫做express.static(), 通过它，我们可以非常方便地创建一个静态资源服务器；
```
// 例如，通过如下代码就可以将 public 目录下的图片、CSS文件、JavaScript 文件对外开放了:
app.use(express.static('./public'));
// 现在，就可以访问public目录中的所有文件了：
// http://localhost:80/cat.jpg
// http://localhost:80/《第二册》.pdf

// 注意：Express 在指定的静态目录中查找文件，并对外提供资源的路径。因此，存放静态文件的目录名不会出现在 URL 中
```

#### 7.托管多个静态资源目录
如果要托管多个静态资源目录，则多次调用 express.static() 函数

注意：访问静态资源文件时，express.static() 函数会根据目录添加顺序查找所需的文件。（相当于把多个目录合并为1个）
```
// 例如，通过如下代码就可以将 public和files 目录下的图片、CSS文件、JavaScript 文件对外开放了:
app.use(express.static('./public'));
app.use(express.static('./files'));
```

#### 8.挂载路径前缀
```
// 如果希望在托管的静态资源访问路径之前，挂载路径前缀，则可以使用如下的方式；
app.use('/public', express.static('./public'));
// 现在就可以通过带有 /public 前缀地址来访问 public 目录中的文件了：
// http://localhost:80/public/cat.jpg
// http://localhost:80/public/《第二册》.pdf

```

#### 9. Express 中的路由
在Express 中，路由指的是客户端的请求与服务器处理函数之间的映射关系。

Express 中的路由分 3 部分组成，分别是请求的类型(METHOD)，请求的 URL 地址(PATH)、处理函数(METHOD)，格式如下：
```
app.METHOD(PATH, HANDLER);

```

#### 10. Express 中的路由的例子

```
// 匹配 GET 请求，且请求 URL 为 /get
app.get('/get', function(req, res) {
  res.send('GET /get' + JSON.stringify(req.query));
})
// 匹配 POST 请求，且请求 URL 为 /post
app.post('/post', function(req, res) {
  res.send('POST /post' + JSON.stringify(req.params)+ JSON.stringify(req.query));
})

```

#### 11.最简单的路由用法

```
// 引入 Express
const express = require('express');
// 创建 Web 服务器，命名为 app
const app = express();

// 挂载路由
app.get('/get', (req, res) => { res.send('GET /' + JSON.stringify(req.params)+ JSON.stringify(req.query)); });
app.post('/post', (req, res) => { res.send('POST /' + JSON.stringify(req.params)+ JSON.stringify(req.query)); });

// 启动 Web 服务器
app.listen(80, function() { console.log('server running at http://127.0.0.1')});

```

#### 12. 模块化路由
  为了方便对路由进行模块化的管理， Express 不建议将路由直接挂载到 app 实例上，而是推荐将路由抽离为单独的模块。

  将路由抽离为单独模块的步骤如下：

     (1) 创建路由模块对应的 .js 文件
     (2) 调用 express.Router() 函数创建路由对象
     (3) 向路由对象上挂载具体的路由
     (4) 使用module.exports 向外共享路由对象
     (5) 使用 app.use() 函数注册路由模块


