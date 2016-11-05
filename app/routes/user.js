/**
 * Created by shediv on 03/08/15.
 */

var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var UserCtrl = new (require('../controllers/user')).User();
this.config = require('../config/config.js');

var auth = jwt({
  secret: this.config.secret,
  userProperty: 'payload'
});

router.post("/", UserCtrl.loginUser); //... Login API
router.post('/register', UserCtrl.register); //.. Reg API
router.get('/current', auth, UserCtrl.current); //.. Verify user Account
router.get('/profile', auth, UserCtrl.profile); //.. Get profile data API

module.exports = router;
