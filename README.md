# mp

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

```
##### 功能：

    1：登陆;
    2：注册;
    3：上传;
    4：点赞;
    5：获取推荐/我的作品列表;
    6：token校验;
    
##### middleware使用:

1: jsonwebtoken 用 jwt 校验 token ; 
2: morgan 做 log 输出 ;
3: body-parser 解析请求信息 ;
4：multer 上传 form 封装 ;

##### package.json:
```
    "body-parser": "^1.18.2",
    "element-ui": "^2.2.1",
    "express": "^4.16.2",
    "jsonwebtoken": "^8.2.2",
    "mongoose": "^5.1.2",
    "morgan": "^1.9.0",
    "multer": "^1.3.0",
    "vue": "^2.2.6",
    "vue-resource": "^1.5.0",
    "vue-router": "^2.3.1"
```


