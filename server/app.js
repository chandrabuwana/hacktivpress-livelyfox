const express = require ('express')
var cors = require ('cors')
var app = express()
const bodyParser = require('body-parser')
var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/hacktivpress-chandrabuwana')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : false}))
app.set ('view engine', 'html')

const user = require('./routes/user')
const index = require('./routes/index')

app.index = ('/',index)
app.user = ('/user', user)

app.listen(3000,function(){
  console.log('jalan di port 3000');

})
