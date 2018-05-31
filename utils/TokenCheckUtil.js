const jwt = require('jsonwebtoken');

exports.getToken = function (obj,app) {
    return jwt.sign(obj, app.get('jwt-secret'), {
        expiresIn: 60 * 60 * 72
    });
}