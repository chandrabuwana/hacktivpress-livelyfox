const express = require ('express')
var cors = require ('cors')
const bodyParser = require('body-parser')
var mongoose = require('mongoose')
var app = express()
app.use(cors())

mongoose.connect('mongodb://localhost/hacktivpress-chandrabuwana')

const index = require('./routes/index')
const user = require('./routes/user')
const article = require('/routes/article')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : false}))
app.set ('view engine', 'html')


app.use('/',index)
app.use('/user', user)
app.use('/article', article)

app.listen( 3002,function(){
  console.log('jalan di port 3002');
})
