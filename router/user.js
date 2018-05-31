const express = require('express');
const router = express.Router();
const UserModel = require('../model/userSchema');
const StringUtil = require('../utils/StringUtil');
const JsonUtil = require('../utils/JsonUtil');
const TokenCheckUtil = require('../utils/TokenCheckUtil');



//登陆 
router.post("/login", (req, res) => {

  UserModel.where({ name: req.body.name }).findOne((err, success) => {
    if (err) {
      JsonUtil.response(res, '200', err, "返回错误");
    } else {
      if (!StringUtil.isEmpty(success)) {
        console.log(success);
        if (req.body.password == success.password) {
          var token = TokenCheckUtil.getToken({ _id: success._id },req.app);
          UserModel.update({ _id: success._id }, { $set: { token: token }}).exec();
          JsonUtil.response(res, '200', {
            "username": success.name,
            "password": success.password,
            "token":token
          }, "登陆成功");
        } else {
          JsonUtil.response(res, '200', {
            "username": req.body.name,
            "password": req.body.password,
            "token":""
          }, "密码错误");
        }
      }else{
        JsonUtil.response(res, '200', {
          "username": req.body.name,
          "password": req.body.password,
          "token":""
        }, "用户不存在，请先注册");
      }
    }
  });

})




//注册  code == '201' 已注册 
router.post("/register", (req, res) => {
  //name唯一     name 已注册？“已注册”：“creat user”;
  UserModel.where({ name: req.body.name }).findOne((err, success) => {
    if (err) {
      JsonUtil.response(res, '200', err, "返回错误");
    } else {
      if (StringUtil.isEmpty(success)) {
        if (StringUtil.isEmpty(req.body.name) || StringUtil.isEmpty(req.body.password)) {
          JsonUtil.response(res, '200', {
            "name": req.body.name,
            "password": req.body.password
          }, "用户名密码不为能空");
        } else {
          UserModel.create(req.body, (err, success) => {
            if (err) {
              JsonUtil.response(res, '200', err, "返回错误");
            } else {
              JsonUtil.response(res, '200', success, "返回成功");
            }
          });
        }
      } else {
        JsonUtil.response(res, '201', success, "返回成功,账号已存在");
      }
    }
  });
})



module.exports = router;