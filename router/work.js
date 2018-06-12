const express = require('express');
const router = express.Router();
const WorkModel = require('../model/workSchema');
//const StringUtil = require('../utils/StringUtil');
const JsonUtil = require('../utils/JsonUtil');
//const TokenCheckUtil = require('../utils/TokenCheckUtil');
const fs = require('fs');
const multer = require('multer');//接收图片
const upload = multer({
    dest: './uploads' 
});



//上传作品
router.post('/upload',upload.single('image'), function (req, res) {
    let tmp_path = req.file.path;
    console.log(tmp_path);
    let des_path = __dirname + '/public/images/' + req.file.path;
    fs.readFile(tmp_path, function (err, data) {
        fs.writeFile(des_path, data, function (err) {
            if (err) {
                console.log(err)
            } else {
                response = {
                    message: 'file success',
                    filename: des_path
                };
                WorkModel.create({
                    username: req.body.name,
                    content: req.body.content,
                    imgurl: des_path
                }, (err, success) => {
                    if (err) {
                        JsonUtil.response(res, '200', err, "返回错误");
                    } else {
                        JsonUtil.response(res, '200', success, "上传图片成功");
                    }
                });
            }

        })
    })

})



module.exports = router;