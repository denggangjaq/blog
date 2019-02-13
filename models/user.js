const mongoose = require('mongoose')

var Schema = mongoose.Schema;

mongoose.connect('mongodb://127.0.0.1:27017/blog',{ useNewUrlParser: true })

var userSchema = new Schema({
	email:{
		type:String,
		required:true
	},
	nick_name:{
		type:String,
		required:true
	},
	password:{
		type:String,
		required:true
	},
	add_time:{
		type:Date,
		dafault:Date.now
	},
	last_modefy_time:{
		type:Date,
		dafault:Date.now
	},
	head_portrait:{
		type:String,
		dafault:'/http://p2.so.qhimgs1.com/bdr/_240_/t011ff4141cb8345cae.jpg'
	},
	/*介绍*/
	introduce:{
		type:String,
		dafault:''
	},
	sex:{
		 type:Number,
		 enum:[0,1,-1],
		 default:-1
	},
	bartyday:{
		type:Date,
		datault:''
	},
	status:{
		type:Number,
		//0无限制 1不可以评论 2 不可以登陆
		enum:[0,1,2]
	}

})

module.exports = mongoose.model('User',userSchema)