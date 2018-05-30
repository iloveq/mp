const express = require('express');
const router = express.Router();
const UserModel = require("../model/userSchema");


function response(res,code,data,message){
  var str = {
    "code": code,
    "data": data,
    "message": message
  };
  res.end(JSON.stringify(str));
};

//判断字符是否为空的方法
function isEmpty(obj){
  if(typeof obj == "undefined" || obj == null || obj == ""){
      return true;
  }else{
      return false;
  }
}


router.post("/login", (req, res) => {

  UserModel.findOne();

})

router.post("/register", (req, res) => {

  UserModel.where({name:req.body.name}).findOne((err,success)=>{

    if(err){
      response(res,'200',err,"返回错误");
    }else{
        if(isEmpty(success)){
          if (isEmpty(req.body.name)||isEmpty(req.body.password)) {
                  response(res,'200',{
                  "username": req.body.name,
                  "password": req.body.password
                },"用户名密码不为空");
          }else{
            UserModel.create(req.body, (err, success) => {
              if (err) {
                response(res,'200',err,"返回错误");
              } else {
                response(res,'200',success,"返回成功");
              }
            });
          }
        }else{
          response(res,'201',success,"返回成功,账号已存在");
        }
    }

  });

 

})

module.exports = router;