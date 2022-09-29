<!--
 * @Author: Orange
 * @Date: 2022-09-29 17:49:10
 * @LastEditors: your name
 * @LastEditTime: 2022-09-29 18:12:52
 * @FilePath: \node-lianxi\Mysql-Node+mySQL.md
 * @Description: 
 * 
 * Copyright (c) 2022 by HuangHuiPing 1632645262@qq.com, All Rights Reserved. 
-->
# Study-Node
### 安装MySQL

MySQL是目前最为流行的开放源码的数据库，是完全网络化的跨平台的关系型数据库系统，它是由瑞典MySQLAB公司开发，目前属于Oracle公司。任何人都能从Internet下载MySQL软件，而无需支付任费用，并且“开放源码”意味着任何人都可以使用和修改该软件。

下载MySQL，地址：https://dev.mysql.com/downloads/installer/

mysql官网上提供了两种安装方式，第一种是在线版联网安装，第二种是本地安装。二者的区别是前者是联网安装，当安装时必须能访问互联网，后者是离线安装使用的，一般建议下载离线安装使用的版本。

MySQL教程，地址：https://www.runoob.com/mysql/mysql-tutorial.html

MySQL工作台，地址：https://dev.mysql.com/downloads/workbench/

### Node.js 连接 MySQL

https://www.npmjs.com/package/nodemon

何使用 Node.js 来连接 MySQL，并对数据库进行操作。

安装：
```Javascript
npm install mysql
```
使用：
```Javascript
var mysql  = require('mysql');  
 
var connection = mysql.createConnection({     
  host     : 'localhost',       
  user     : 'root',              
  password : '123456',       
  port: '3306',                   
  database: 'test' 
}); 
 
connection.connect();
 
var sql = 'SELECT * FROM websites';
//查
connection.query(sql,function (err, result) {
  if(err){
    console.log('[SELECT ERROR] - ',err.message);
    return;
  }
  console.log('--------------------------SELECT----------------------------');
  console.log(result);
  console.log('------------------------------------------------------------\n\n');  
});
 
connection.end();
```
