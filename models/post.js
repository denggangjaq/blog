const mongoose = require('mongoose')

var Schema = mongoose.Schema;

mongoose.connect('mongodb://127.0.0.1:27017/blog',{ useNewUrlParser: true })

var postSchema = new Schema({
	author:{
		type:String,
		required:true
	},
	title:{
		type:String,
		required:true
	},
	classfy:{
		type:String,
		required:true
	},
	label:{
		type:String,
		required:true
	},
	content:{
		type:String,
		required:true
	},
	add_time:{
		type:String,
		default:""
	},
	sort:{
		type:Number,
		default:''
	}

})

module.exports = mongoose.model('Post',postSchema)