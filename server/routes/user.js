var express = require('express')
var router = express.Router()
var User = require('../controllers/user')

router.get('/',User.viewAllUser)
router.post('/',User.createUser)

module.exports = router;