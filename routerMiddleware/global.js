/*
 * @Author: Orange
 * @Date: 2022-09-02 11:32:31
 * @LastEditors: your name
 * @LastEditTime: 2022-09-02 11:45:15
 * @FilePath: \node-lianxi\routerMiddleware\global.js
 * @Description: 全局的中间件函数
 * 
 * Copyright (c) 2022 by HuangHuiPing 1632645262@qq.com, All Rights Reserved. 
 */

// 常量 mw 所指向的，就是一个中间件函数
const mw = function (req, res, next) {
  console.log('全局路由中间件函数');
  // 注意：在当前中间件的业务处理完毕后，必须调用 next() 函数；
  // 标识把流转关系转交给下一个中间件或路由
  
  // return res.send('当前未登录'); 可以使用return进行响应拦截
  next();
}
 
// 向外导出中间件
module.exports = {
  mw
};