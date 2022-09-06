// (1).导入 express
const express = require('express');

// (2).创建 Web 服务器
const app = express();

// 配置解析 application/json 格式数据的内置中间件
app.use(express.json());
// 配置解析 application/x-www-form-urlencoded 格式数据的内置中间件
app.use(express.urlencoded({ extended: false }));

// 导入全局的路由中间件函数 
const { mw } = require('./routerMiddleware/global.js');

// 全局生效的中间件,任何请求都会先经过这个全局中间件
app.use(mw);

// 导入路由模块
const userRouter = require('./router/user.js');

// 使用 app.use() 注册路由模块，并添加统一的访问前缀 /orange
// 注意：原先 /user/add 的路径，加了访问前缀后需要改为 /orange/user/add
app.use('/orange', userRouter);

// 托管静态资源 public 文件夹访问路径，顺便挂载路径前缀 /public；
app.use('/public', express.static('./public'));
// 现在就可以通过带有 /public 前缀地址来访问 public 目录中的文件了：
// http://localhost:80/public/cat.jpg
// http://localhost:80/public/《第二册》.pdf

// 定义错误级别的中间件，捕获整个项目的错误，防止项目的崩溃；（错误级别的中间件，必须注册在所有路由之后）
app.use((err, req, res, next) => {
  console.log('发生了错误：' + err.message) // 在服务器打印错误消息
  res.send('Error!' + err.message);         // 向客户端响应错误相关的内容
})

// (3).调用 app.listen(端口号, 启动成功后的回调函数)，启动服务器
app.listen(80, () => {
  console.log('express server running at http://127.0.0.1:80')
})