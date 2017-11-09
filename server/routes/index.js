var express = require('express')
var router = express.Router()
var User = require('../controllers/user')

router.post('/login', User.findUser)
router.post('/register', User.createUser)

module.exports = router;