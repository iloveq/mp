const jwt = require('jsonwebtoken');

exports.getToken = function (obj,app) {
    return jwt.sign(obj, app.get('jwt-secret'), {
        expiresIn: 60 * 60 * 72
    });
}

//api 请求校验 token
exports.verifyToken = function(req, res, next){

    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if(token){
        jwt.verify(token, req.app.get('jwt-secret') , function(err,decoded) {
            if(err) {
              return res.json({code:"401",message:'token错误'})
            }else {
              //解析成功
              next()
            }
          })
    }else{
        return res.status(403).json({
            code: '403',
            message: '没有提供token！'
        });
    }


}