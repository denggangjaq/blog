var express = require('express')
var User = require('../models/user')
var Post = require('../models/post')
var md5 = require('blueimp-md5')
var htmlEncode = require('js-htmlencode').htmlEncode
var htmlDecode = require('js-htmlencode').htmlDecode
var moment = require('moment-timezone');

var router = express.Router()


router.get('/',function(req,res){
	Post.find(function(err,post){
		if (err) {
			return req.status(500).error("internet error")
		}
		res.render('index.html',{
			post:post
		})
	}).sort({sort:-1})
	
})

router.get('/index',function(req,res){
	Post.find(function(err,post){
		if (err) {
			return req.status(500).error("internet error")
		}

		res.render('index.html',{
			post:post,
			user:req.session.user,
			title:'首页'
		})
	}).sort({sort:-1})

})
//登陆
router.get('/login',function(req,res){
	
	res.render('login.html')
})
//登陆表单处理
//状态码设计:1.登陆成功 2.服务器错误 3.邮箱或者密码错误
router.post('/login',function(req,res){
	var body= req.body
	User.findOne({
			email:body.email,
			password:md5(md5(body.password))
		
	},function(err,user){
		if(err){
			return res.status(500).json({
				status_code:3,
				success:false,
				message:err.message
			})
		}
		if(!user){
			return res.status(200).json({
				status_code:2,
				success:true,
				message:'email or nick_name reade'
			})
		}

		req.session.user = user
		res.status(200).json({
				status_code:1,
				success:true,
				message:'ok'
			})
		
	})
})
//注册
router.get('/register',function(req,res){
	res.render('register.html')
})
//注册表单处理
////状态码 1 成功 2 服务端错误 3 邮箱或者昵称已存在
router.post('/register',function(req,res){
	var body = req.body
	User.find({
		$or:[{
			email:body.email
		},
		{
			nick_name:body.nick_name
		}]
	},function(err,data){
		if(err){
			return res.status(500).json({
				status_code:2,
				success:false,
				message:'inetrnet error'
			})
		}
	 if(data && data.constructor==Array && data.length > 0){
			return res.status(200).json({
				status_code:3,
				success:true,
				message:'email or nick_name reale exits'
			})
			
		}
		body.password = md5(md5(body.password))
			//保存session
			req.session.user = User(body)
			 new User(body).save(function(err){

			 	if(err){
			 		return res.status(500).json({
			 		status_code:2,
					success:false,
					message:'server error'
					})
			 	}
			 	res.status(200).json({
			 	status_code:1,
			 	success:true,
			 	message:'ok'
			 	})
			 })

	})
})

router.get('/goOut',function(req,res){
	//清除登陆状态
	delete(req.session)
	/*req.session = null*/
	//重定向到登陆页面
	res.redirect('/')
})

//发表文章
router.post("/post",function(req,res){
	var postData = req.body
	postData.content = htmlEncode(postData.content)
	postData.add_time = moment().format('YYYY-MM-DD HH:mm:ss')
	postData.sort = 1
	Post.find(function(err,post){
		if(err) {return req.status(500).error("internet error")}
		postData.sort = post.length+1

			new Post(postData).save(function(err){
			if(err){
				return res.status(500).json({
					status_code:2,
					success:false,
					message:err.message
				})
			}

			return res.status(200).json({
					status_code:1,
					success:true,
					message:"ok"
			})
		})

	})

})

//浏览文章
router.get("/list",function(req,res){
	Post.findById(req.query.id,function(err,post){
		if (err) {
			return res.status(500).error("Internet error")
		}
		res.render('list.html',{
			post:post
		})
	})
	
})
module.exports = router

