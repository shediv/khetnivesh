/**
 * Created by shediv on 03/08/15.
 */

var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var InvestorCtrl = new (require('../controllers/investor')).Investor();
this.config = require('../config/config.js');

var auth = jwt({
  secret: this.config.secret,
  userProperty: 'payload'
});

//router.get('/', auth, InvestorCtrl.getList); //.. Get profile data API
router.get('/', auth, InvestorCtrl.mainPage); //.. Get profile data API

// router.post("/", UserCtrl.loginUser); //... Login API
// router.post('/register', UserCtrl.register); //.. Reg API
// router.get('/current', auth, UserCtrl.current); //.. Verify user Account
// router.get('/profile', auth, UserCtrl.profile); //.. Get profile data API

module.exports = router;