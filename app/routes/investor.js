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


router.post("/", auth, InvestorCtrl.investOnFarmer); //... Login API
router.get('/', auth, InvestorCtrl.mainPage); //.. Get profile data API
router.get('/search', auth, InvestorCtrl.getAllFarmers); //.. Get profile data API
router.get('/profile', auth, InvestorCtrl.profile); //.. Get profile data API
router.get('/farmer/:id', auth, InvestorCtrl.getfarmerDetails); //.. Get profile data API

module.exports = router;