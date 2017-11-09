var mongoose = require('mongoose')
var Schema = mongoose.Schema,
ObjectId = Schema.ObjectId
var User = require('./models/user')

var articleSchema = new Schema({
  title: '',
  content: '',
  category: '',
  author: {type : Schema.ObjectId, ref: User }
})

var Article = mongoose.model('Article', articleSchema)

module.exports = Article;