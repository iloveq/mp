const express = require('express');
const router = express.Router();
const WorkModel = require('../model/workSchema');
//const StringUtil = require('../utils/StringUtil');
const JsonUtil = require('../utils/JsonUtil');
//const TokenCheckUtil = require('../utils/TokenCheckUtil');
const multer = require('../utils/MulterUtil');

const upload = multer.single('image');


//上传作品
router.post('/upload', upload,function (req, res) {
    
        WorkModel.create({
            username: req.body.name,
            content: req.body.content,
            imgurl: 'http://' + req.headers.host + '/images/' + req.file.filename
        }, (err, success) => {
            if (err) {
                JsonUtil.response(res, '200', err, "返回错误");
            } else {
                JsonUtil.response(res, '200', success, "上传图片成功");
            }
        });
  
})



module.exports = router;