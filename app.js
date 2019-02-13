const express = require('express')
const router = require('./router/router')
const path = require('path')
const bodyParser = require('body-parser')
var session = require('express-session')
var app  = express()

app.engine('html',require('express-art-template'))

app.use('/public/',express.static(path.join(__dirname,'./public')))
app.use('/node_modules/',express.static(path.join(__dirname,'./node_modules')))
app.use('/public/login/',express.static(path.join(__dirname,'./public/login')))
app.use('/public/images/',express.static(path.join(__dirname,'./public/images')))

// 配置模板引擎和 body-parser 一定要在 app.use(router) 挂载路由之前
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended:false }))
app.use(bodyParser.json())
//配置session
app.use(session({
  secret: 'dgcast',//随机的后缀加密和密码会连接起来
  resave: false,
  saveUninitialized: true ,
  'lifetime': 300000
}))

app.use(router)

app.use(function(req,res){
	res.render("error.html")
})

// 配置一个全局错误处理中间件
app.use(function (err, req, res, next) {
  res.status(500).json({
    err_code: 500,
    message: err.message
  })
})


app.listen(3000,function(){
	console.log("running")
})
