const User = require ('../models/user')
var bcrypt = require('bcryptjs')
var jwt = require ('jsonwebtoken')
require('dotenv').config()

var viewAllUser= (req,res)=>{
  User.find()
  .then(data=>{
    res.send(data)
  })
  .catch(err=>{
    console.error(err)
  })
}

var createUser = (req,res)=>{
  var salt = bcrypt.genSaltSync(10)
  console.log(salt);
  var hash = bcrypt.hashSync(req.body.password, salt)
  console.log(hash);
  User.create({
    username: req.body.username,
    password :hash,
    name: req.body.name,
    salt  : salt
  })
  .then(data=>{
    res.send(data)
    console.log('oi');
  })
  .catch(err=>{
    console.error(err)
  })
}
var findUser= (req,res)=>{
  User.findOne({
    username: req.body.username
  })
  .then(data=>{
    if(bcrypt.compareSync(req.body.password, data.password)){
      var token = jwt.sign({
        _id: data._id,
        username: data.username,
        name: data.name
      },process.env.SECRET_KEY)
      res.send({token})
    }else{
      console.log("invalid password try again")
    }
  })
  .catch(err=>{
    res.send(err)
  })
}

module.exports = {
                  viewAllUser,
                  createUser,
                  findUser
};