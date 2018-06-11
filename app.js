const express = require('express');
const mongooes = require('mongoose');
const bodyParser = require('body-parser');
const user = require('./router/user');
const work = require('./router/work');
const config = require('./config/params');
const logger = require('morgan');


const db = mongooes.connect(config.mongodb);



const app = express();
//设置全局参数 'jwt-secret'
app.set('jwt-secret', config.jwtsecret);
app.use(bodyParser.json());
//body parser 拿到 req 
app.use(bodyParser.urlencoded({ extended: false }));
//跨域访问
app.use("*", function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  if (req.method === 'OPTIONS') {
    res.send(200)
  } else {
    next()
  }
});

//morgan 输出日志到控制台
app.use(logger('dev'));

//路由
app.use('/api', user);
app.use('/api', work);


//开启服务
app.listen(config.serverPort, () => {
  console.log('app listening on port' + config.serverPort);
})

