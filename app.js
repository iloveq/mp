const express  = require('express');
const mongooes = require('mongoose');
const bodyParser = require('body-parser');
const user = require('./router/user');

var db = mongooes.connect('mongodb://localhost:27017/mp');



const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use("*", function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    if (req.method === 'OPTIONS') {
      res.send(200)
    } else {
      next()
    }
  });

app.use('/api',user);


app.listen(3001,() => {
    console.log('app listening on port 3001.')
})