# Study-Node

### nodemon(热更新)

https://www.npmjs.com/package/nodemon

在编写调试 Node.js 项目的时候，如果修改了项目的代码， 则需要频繁的手动 close 掉，然后再重新启动，非常繁琐。现在，我们可以使用 nodemon 这个工具，它能够监听项目文件的变动，当代码被修改后，nodemon 会自动帮我们重启项目，极大方便了开发和调试。

安装：
```Javascript
npm install -g nodemon
npm install nodemon --save
```
使用：

```Javascript
// 将node 命令 替换为 nodemon 命令，使用 nodemon app.js 来启动项目
nodemon app.js
```

### 在线接口测试postman工具： 

https://web.postman.co/

---
## 一、Node+ express

#### app.use
app.use() 函数的作用，就是用来注册全局中间件

#### 1.Node+ express 的基本服务开启
```Javascript
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
```Javascript
app.get('请求URL', function (req, res) {/** 处理函数 */})
app.post('请求URL', function (req, res) {/** 处理函数 */})
```

#### 3.监听客户端GET、POST请求，并向客户端吧响应具体的内容

通过res.send()方法，可以把处理好的内容，发送给客户端:

res.send() 方法的参数 可是对象，也可以是字符串
```Javascript
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
```Javascript
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

```Javascript
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
```Javascript
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
```Javascript
// 例如，通过如下代码就可以将 public和files 目录下的图片、CSS文件、JavaScript 文件对外开放了:
app.use(express.static('./public'));
app.use(express.static('./files'));
```

#### 8.挂载路径前缀
```Javascript
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

```Javascript
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

```Javascript
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

- 创建路由模块：
```JavaScript
// /router/user.js 文件

var express = require('express');               // 1. 导入 express
var router = express.Router();                  // 2. 创建路由对象

router.get('/user/list', function (req, res) {  // 3. 挂载获取用户列表的路由
  res.send('Get user list.')
})
router.post('/user/add', function (req, res) {  // 4. 挂载添加用户的路由
  res.send('Add new user.')
})

module.exports = router;                        // 5. 向外导出路由对象
```

- 注册路由模块：
```JavaScript
// main.js

// 1. 导入路由模块
const userRouter = require('/router/user.js');

// 2. 使用 app.use() 注册路由模块
app.use(userRouter);
```

#### 13. 为路由模块添加前缀
类似于托管静态资源时，为静态资源同意挂载访问前缀一样，路由模块添加前缀的方式也非常简单：

```Javascript
// 首先先回顾一下托管静态资源以及访问前缀的写法:
// 1.使用 app.use() 托管静态资源
app.use(express.static('./public')); 

// 2.使用 app.use() 托管静态资源，并添加统一的访问前缀 /public
app.use('/public', express.static('./public')); // 托管静态资源加访问前缀

// 为路由模块添加前缀：
// 1.导入路由模块
const userRouter = require('./router/user.js');

// 2.使用 app.use() 注册路由模块，并添加统一的访问前缀 /orange
app.use('/orange', userRouter);

// 注意：原先 /user/add 的路径，加了访问前缀后需要改为 /orange/user/add
```
#### 14. Express 中间件
- 什么是中间件

  中间件（Middleware）,特指业务流程的中间处理环节。

- Express 中间件的调用流程

  当一个请求到达 Express 的服务器之后，可以连续调用多个中间件，从而对这次请求进行预处理。

  客户端 --(请求)--> Express服务器 --> N个中间件 --(处理)--> 处理完毕，响应这次请求[路由]--(响应)--> 客户端

- Express 中间件的格式
  Express 的中间，本质上就是一个 function 处理函数，Express 中间件的格式如下：
```Javascript
var express = require('express');
var app = express();

app.get('/', function(req, res, next) {
  next();
})

app.listen(3000);

// 注意： 中间件函数的形参列表中，必须包含 next 参数。而路由处理函数中只包含req 和res
```
  next 函数的作用：
  
  next 函数是实现多个中间件连续调用的关键，它表示把流装关系转交给下一个中间件或路由；

  客户端 --请求--> Express服务器 --> 中间件1 --next()--> 中间件2 --next()--> 处理完毕，响应这次请求[路由]--响应--> 客户端

- 定义Express 中间件函数
  可以通过如下的方式，定义一个最简单的中间件函数：

```Javascript
// 常量 mw 所指向的，就是一个中间件函数
const mw = function (req, res, next) {
  console.log('这是一个最简单的中间件函数');
  // 注意：在当前中间件的业务处理完毕后，必须调用 next() 函数；
  // 标识把流转关系转交给下一个中间件或路由
  next();
}
```

- 全局生效的路由中间件
  客户端发起的任何请求，到达服务器之后，都会触发的中间件，叫做全局生效的中间件。

  可以使用 app.use() 连续定义多个全局中间件，客户端请求到达服务器之后，会按照中间件定义的先后顺序依次执行调用。

  通过调用 app.use(中间件函数)，即可定义一个全局生效的中间件，示例代码如下：

```Javascript
// 常量 mw 所指向的，就是一个中间件函数
const mw = function (req, res, next) {
  console.log('这是一个最简单的中间件函数');
  // 注意：在当前中间件的业务处理完毕后，必须调用 next() 函数；
  // 标识把流转关系转交给下一个中间件或路由

  // return res.send('当前未登录'); 可以使用return进行响应拦截
  next();
}

// 全局生效的中间件,任何请求都会先经过这个全局中间件
app.use(mw);

// 注册多个express 路由中间件
// app.use(mw1);
// app.use(mw2);

```

- 中间件的作用
  多个中间件，共享一份 req 和 res ，基于这样的特性，我们可以在上游的中间件中，同意为 req 或 res 对象添加自定义的属性和方法，供下游的中间件或路由使用。

```Javascript
// 常量 mw 所指向的，就是一个中间件函数
const mw = function (req, res, next) {
  req.orange = 'orange';
  next();
}
```
- 局部生效的中间件
  不使用 app.use() 定义的中间件，叫做局部生效的中间件，实例代码如下：

```JavaScript
// 定义中间件函数 mv1
const mv1 = function (req, res, next) {
  console.log('这是局部中间件函数mv1')
  next();
}

// mv1 这个中间件只在'当前路由中生效'，这种用法属于“局部生效的中间件”
app.get('/', mv1, function (req, res) {
  res.send('Home page');
})

// mv1 这个中间件不会影响下面这个路由
app.get('/user', function (req, res) {res.send('User page');})

```

- 定义多个局部中间件
  可以在路由中，通过如下两种等价的方式，使用多个局部中间件

```JavaScript
// 以下两种写法是完全等价的，可根据自己的喜好，选择任意一种方式进行使用
app.get('/', mv1, mv2, (req, res) => {res.send('ooo')})
app.get('/', [mv1, mv2], (req, res) => {res.send('ooo')})
```

- 了解中间件的5个使用注意事项
  (1.) 一定要在路由之前注册中间件

  (2.) 客户端发送过来的请求，可以连续调用多个中间件进行处理

  (3.) 执行完中间件的业务待，啊之后，不要忘记调用 next() 函数

  (4.) 为了防止代码逻辑混乱，调用 next() 函数后不要再写额外的代码

  (5.) 连续调用多个中间件时，多个中间件之间，共享req、res 对象

- 中间件的分类
  为了方便大家理解和记忆中间件的使用 Express 官方把常见的中间件用法，分成了5大类，分别是：

  (1.) 应用级别的中间件
    通过 app.use() 或 app.get() 或 app.post(), 绑定到app 实例上的中间件，叫做应用级别的中间件，代码示例如下：

    ```JavaScript
      // 应用级别的中间件（全局中间件）
      app.use((req, res, next) => { next() });

      // 应用级别的中间件（局部中间件）
      app.get('/', mv1, (req, res) => { res,send('orange') });
    ```

  (2.) 路由级别的中间件
    绑定到 express.Router() 实例上的中间件，叫做路由级别的中间件，它的用法和应用级别中间件没有任何区别。只不过，应用级别中间件是绑定到 app 实例上，路由级别中间件是绑定到 router 实例上，代码示例如下：

    ```JavaScript
      var app = express();
      var router = express.Router();

      // 路由级别的中间件
      router.use(function (req, res, next) {
        console.log('time: ', Date.now());
        next();
      })

      app.use('/', router);
    ```

  (3.) 错误级别的中间件
    错误级别中间件的作用：专门用来捕获整个项目中发生的异常错误，从而防止项目崩溃的问题;

    格式：错误级别中间件的 function 处理函数中，必须有4个形参，形参顺序从前到后，分别是 (err, req, res, next);

    注意：错误级别的中间件，必须注册在所有路由之后！

    ```JavaScript
      app.get('/', (req, res) => {                // 1. 路由
        throw new Error('服务器内部发生了错误！'); // 1.1 跑出一个自定义的错误
        res,send('orange') 
      });

      app.use((err, req, res, next) => {          // 2. 错误级别的中间件
        console.log('发生了错误：' + err.message) // 2.1 在服务器打印错误消息
        res.send('Error!' + err.message);         // 2.2 向客户端响应错误相关的内容
      })
    ```

  (4.) Express 内置的中间件
    自 Express 4.16.0 版本开始， Express 内置了 3 个常用的中间件，极大的提高了 Express 项目的开发效率和体验：

      1. express.static 快速托管静态资源的内置中间件。例如： HTML 文件、图片、css样式等（无兼容性）

      2. express.json 解析 JSON 格式的请求体数据（有兼容性，仅在4.16.0+版本中可用）

      3. express.urlencoded 解析 URL-encoded 格式的请求体数据（有兼容性，仅在4.16.0+版本中可用）
      
      ```Javascript
      // main.js 文件
      
      // 配置解析 application/json 格式数据的内置中间件
      app.use(express.json());
      // 配置解析 application/x-www-form-urlencoded 格式数据的内置中间件
      app.use(express.urlencoded({ extended: false }));

      // 在服务器，可以使用 req.body 这个属性，来获取接收客户端发送过来的 URL-encoded 格式和 JSON 格式的数据
      
      // router.js 文件
      var express = require('express');               // 1. 导入 express
      var router = express.Router();                 // 2. 创建路由对象

      // 3.挂载路由

      // 此处是用于测试 express.json 的接口
      // express.json 解析 JSON 格式的请求体数据（有兼容性，仅在4.16.0+版本中可用）
      router.post('/post-josn', function (req, res) {
        // 在服务器，可以使用 req.body 这个属性，来获取接收客户端发送过来的 URL-encoded 格式和 JSON 格式的数据
        // 默认情况下，如果不配置解析表单数据的中间件，则 req.body 默认等于 undefined
        console.log("req.body : ")
        console.log(req.body)
        res.send(req.body)
      })

      // 此处是用于测试 express.urlencoded 的接口
      // express.urlencoded 解析 URL-encoded 格式的请求体数据（有兼容性，仅在4.16.0+版本中可用）
      router.post('/post-urlencoded', function (req, res) {
        // 在服务器，可以使用 req.body 这个属性，来获取接收客户端发送过来的 URL-encoded 格式和 JSON 格式的数据
        // 默认情况下，如果不配置解析表单数据的中间件，则 req.body 默认等于 undefined
        console.log("req.body : ")
        console.log(req.body)
        res.send(req.body)
      })

      module.exports = router;                        // 4. 向外导出路由对象
      ```

  (5.) 第三方的中间件
    非 Express 官方内置的，而是由第三方开发出来的中间件，叫做第三方中间件。在项目中，大家可以按需下载并配置第三方中间件，从而提高项目的开发效率；

    例如： 在 express@4.16.0 之前的版本中，经常使用 body-parser 这个第三方中间件，来解析请求体数据。使用步骤如下：
      1.  运行 npm install body-parser 安装中间件

      3. 使用 require 导入中间件

      5. 调用 app.use() 注册并使用中间件
