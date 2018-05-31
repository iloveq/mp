const express = require('express');
const router = express.Router();
const UserModel = require('../model/userSchema');
const StringUtil = require('../utils/StringUtil');
const JsonUtil = require('../utils/JsonUtil');




//登陆
router.post("/login", (req, res) => {

  UserModel.findOne();

})

//注册
router.post("/register", (req, res) => {

  UserModel.where({name:req.body.name}).findOne((err,success)=>{
    if(err){
      JsonUtil.response(res,'200',err,"返回错误");
    }else{
        if(StringUtil.isEmpty(success)){
          if (StringUtil.isEmpty(req.body.name)||StringUtil.isEmpty(req.body.password)) {
            JsonUtil.response(res,'200',{
                  "username": req.body.name,
                  "password": req.body.password
                },"用户名密码不为空");
          }else{
            UserModel.create(req.body, (err, success) => {
              if (err) {
                JsonUtil.response(res,'200',err,"返回错误");
              } else {
                JsonUtil.response(res,'200',success,"返回成功");
              }
            });
          }
        }else{
          JsonUtil.response(res,'201',success,"返回成功,账号已存在");
        }
    }

  });

 

})

module.exports = router;