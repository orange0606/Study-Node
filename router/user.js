var express = require('express');               // 1. 导入 express
var router = express.Router();                 // 2. 创建路由对象

router.get('/user/list', function (req, res) {  // 3. 挂载获取用户列表的路由
  res.send('Get user list.')
})
router.post('/user/add', function (req, res) {  // 4. 挂载添加用户的路由
  res.send('Add new user.')
})

module.exports = router;                        // 5. 向外导出路由对象