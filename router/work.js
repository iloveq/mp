const express = require('express');
const router = express.Router();
const WorkModel = require('../model/workSchema');
const StringUtil = require('../utils/StringUtil');
const JsonUtil = require('../utils/JsonUtil');
//const TokenCheckUtil = require('../utils/TokenCheckUtil');
const multer = require('../utils/MulterUtil');

const upload = multer.single('image');


//上传作品  image:blob  name:string content:string 
router.post('/upload', upload, function (req, res) {

    WorkModel.create({
        username: req.body.name,
        content: req.body.content,
        imgurl: 'http://' + req.headers.host + '/images/' + req.file.filename,
        userId: req.body.userId,
        like: 0,
        share: 0,
        likeContract: []
    }, (err, success) => {
        if (err) {
            console.log(err);
            JsonUtil.response(res, '201', err, "返回错误");
        } else {
            console.log(success);
            JsonUtil.response(res, '200', success, "上传图片成功");
        }
    });

})

//获取我的作品列表 page: 0 ~ n  name:string .skip(2*req.body.page).limit(2)
router.post('/getWorkList', function (req, res) {
    WorkModel.where({ username: req.body.name }).find((err, success) => {
        if (err) {
            JsonUtil.response(res, '201', err, "返回错误");
        } else {
            if (!StringUtil.isEmpty(success)) {
                let arr = new Array();
                success.forEach(function (value, index, array) {
                    let isLike = StringUtil.isInArray(value.likeContract, req.body.name);
                    let newObj = {
                        _id: value._id,
                        username: value.username,
                        content: value.content,
                        imgurl: value.imgurl,
                        like: value.like,
                        share: value.share,
                        isLike: isLike
                    }
                    arr.push(newObj)
                })
                console.log(arr);
                JsonUtil.response(res, '200', arr, "返回成功");
            } else {
                console.log("e" + success);
                JsonUtil.response(res, '201', success, "数据为空");
            }
        }

    })
})

//推荐列表
router.post('/getCardList', function (req, res) {
    WorkModel.where({ 'like': { $gte: StringUtil.isEmpty(req.body.max) ? 100 : req.body.max } }).find((err, success) => {
        if (err) {
            JsonUtil.response(res, '201', err, "返回错误");
        } else {
            if (!StringUtil.isEmpty(success)) {
                let arr = new Array();
                success.forEach(function (value, index, array) {
                    let isLike = StringUtil.isInArray(value.likeContract, req.body.name);
                    let newObj = {
                        _id: value._id,
                        username: value.username,
                        content: value.content,
                        imgurl: value.imgurl,
                        like: value.like,
                        share: value.share,
                        isLike: isLike
                    }
                    arr.push(newObj)
                })

                console.log(arr);
                JsonUtil.response(res, '200', arr, "返回成功");
            } else {
                console.log("e" + success);
                JsonUtil.response(res, '201', success, "数据为空");
            }
        }

    }).sort({ like: -1 })
})


//点赞/取消 1/0  type:1/0 username:string workId:string
router.post('/like', function (req, res) {
    if (req.body.type === "1") {
        //点赞
        console.log("点赞");
        WorkModel.update({ _id: req.body.workId }, { $addToSet: { likeContract: req.body.username }, $inc: { like: 1 } }, (err, success) => {
            if (err) {
                JsonUtil.response(res, '201', err, "点赞失败");
            } else {
                console.log(success);
                JsonUtil.response(res, '200', success, "点赞成功");
            }
        });
    } else {
        //取消
        console.log("取消");
        WorkModel.update({ _id: req.body.workId }, { $pull: { likeContract: req.body.username }, $inc: { like: -1 } }, (err, success) => {
            if (err) {
                JsonUtil.response(res, '201', err, "取消失败");
            } else {
                console.log(success);
                JsonUtil.response(res, '200', success, "取消成功");
            }
        });
    }
})




module.exports = router;