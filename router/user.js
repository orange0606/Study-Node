var express = require('express');               // 1. 导入 express
var router = express.Router();                 // 2. 创建路由对象

// 3.挂载路由
router.get('/user/list', function (req, res) {  // 挂载获取用户列表的路由
  res.send('Get user list.')
})
router.post('/user/add', function (req, res) {  // 挂载添加用户的路由
  res.send('Add new user.')
})
router.get('/err', function (req, res) {  // 挂载报错的路由
  throw new Error(' 服务器内部发生了错误！')
  res.send('err.')
})

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