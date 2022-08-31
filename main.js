// (1).导入 express
const express = require('express');

// (2).创建 Web 服务器
const app = express();

// 导入路由模块
const userRouter = require('./router/user.js');

// 使用 app.use() 注册路由模块
app.use(userRouter);

// 托管静态资源 public 文件夹访问路径，顺便挂载路径前缀 /public；
app.use('/public', express.static('./public'));
// 现在就可以通过带有 /public 前缀地址来访问 public 目录中的文件了：
// http://localhost:80/public/cat.jpg
// http://localhost:80/public/《第二册》.pdf

// (3).调用 app.listen(端口号, 启动成功后的回调函数)，启动服务器
app.listen(80, () => {
  console.log('express server running at http://127.0.0.1:80')
})