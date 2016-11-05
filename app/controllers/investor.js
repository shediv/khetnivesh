var Investor = function()
{
	var async = require('async');
	var User = require('../models/user').User;
	var FarmersModel = require('../models/farmers').FarmersModel;
	var fs = require('fs');
	var crypto =require('crypto');
	var passport = require('passport');
	var imagick = require('imagemagick');
	var mongoose = require('mongoose');
	var nodeMailer = require('nodemailer');
	var constants = require('../libraries/constants')
	var CommonLib = require('../libraries/common').Common;

	var path = require('path');
	var EmailTemplate = require('email-templates').EmailTemplate;
	var templatesDir = path.resolve(__dirname, '../..', 'public/templates/emailTemplates');

	var md5 = require('md5');

	this.params = {};
	this.config = require('../config/config.js');
	var self = this;

	// this.loginUser = function(req, res){	
	// 	passport.authenticate('local', function(err, user, info){
	//     var token;

	//     // If Passport throws/catches an error
	//     if (err) {
	//       res.status(404).json(err);
	//       return;
	//     }

	//     // If a user is found
	//     if(user){
	//     	if(!user.isVerified){
	//     		//Email not verified
	//     		res.status(401).json({message : constants.constEmailNotVerified});
	//     	}else{
	// 	    	if(req.body.rememberme){token = user.generateLongJwt();}
	// 	    	else{token = user.generateLongJwt();}
	// 		      res.status(200);
	// 		      res.json({
	// 		        token : token
	// 		      });
	// 	    }  
	//     } else {
	//       // If user is not found
	//       res.status(401).json(info);
	//     }

	//   })(req, res);
	// };

	// //Sign Up
	// this.register = function(req, res) {
	// 	User.findOne({email: req.body.email, isActive : 1},function(err, result){
	// 		if(result){
	// 			return res.status(403).json({message: constants.constEmailAlreadyRegistered})
	// 		}
	// 		else{
	// 			  var newUser = new User();
	// 			  newUser.firstName = req.body.firstName;
	// 			  newUser.lastName = req.body.lastName;
	// 			  newUser.birthMonth = req.body.birthMonth;
	// 			  newUser.birthYear = req.body.birthYear;
	// 			  newUser.email = req.body.email;
	// 			  newUser.passwordHint = req.body.passwordHint;
	// 			  newUser.passwordLastUpdatedAt = new Date();
	// 			  newUser.createdAt = new Date();
	// 			  newUser.updatedAt = new Date();
	// 			  newUser.loginType = "registered";
	// 			  newUser.isActive = 1;
	// 			  newUser.isVerified = false;
	// 			  newUser.setPassword(req.body.password);

	// 			newUser.save(function(err) {
	// 			    var token;
	// 		        token = newUser.generateJwt();
	// 			    res.status(200).json({message: constants.constNewUserIsCreated, userID: newUser._id});
	// 			    //Set Mail Options
	// 			    var mailOptions = {
	// 			      email: req.body.email,
	// 			      name: {
	// 			        first: req.body.firstName,
	// 			        last: req.body.lastName
	// 			      },
	// 			      userId:newUser._id,
	// 			      token:token,
	// 			      appHost:self.config.appHost
	// 			    };

	// 			    //console.log(newUser._id);
	// 			    //To send verification mail to user
	// 			    var emailTemplate = new EmailTemplate(path.join(templatesDir, 'register'));
	// 				emailTemplate.render(mailOptions, function(err, results){
	// 					if(err) return console.error(err)
	// 					self.transporter.sendMail({
	// 				        from: "help@creativecapsule.com", // sender address
	// 				        to: mailOptions.email, // list of receivers
	// 				        subject: 'One Last Step To Create Your Account!',
	// 			        	html: results.html
	// 					}, function(err, responseStatus){
	// 						if(err) return console.log(err);
	// 					   	console.log("responseStatus.message");
	// 					})
	// 				});
	// 		  	});
	// 		}
	// 	})  
	// };

	this.current = function(req, res){
		if (!req.payload._id) {
	    	res.status(401).json({message : constants.constUnAuthorizedAccess});
	  	} else {
		    User.findById(req.payload._id).exec(function(err, user) {
				return res.status(200).json({msg: "User has sucessfully Logged in"});		       	
		    });
	  	}
	}

	this.profile = function(req, res) {	

	 if (!req.payload._id) {
	    res.status(401).json({
	      message : constants.constUnAuthorizedAccess
	    });
	  } else {
	  	var notificationPrefrenceArray = [];
	    User.findOne({ _id : req.payload._id }).lean().exec(function(err, user) {
			FarmersModel.find({ "investors.userId" : user._id.toString() }, { "name" : 1, "crop" : 1, "profitShareRate": 1, "investors.$.userId" : 1 }).exec(function(err, farmers) {
				user.farmers = farmers;
				return res.status(200).json({user: user});
			})	
	    });
	  } 
	};

	this.getList = function(req, res){
	    FarmersModel.find({}).exec(function(err, farmers) {
			return res.status(200).json({farmers: farmers});		       	
	    });
	}

	this.mainPage = function(req, res){
	    async.parallel({
            topFarmers: function(callbackInner) {
                FarmersModel.find({ }, {name : 1, crop : 1, profitShareRate : 1, profitOver4years : 1, profileImage : 1}).lean().sort({ profitOver4years: -1 }).limit(5).exec(function(err, farmers){                                                                                                                            
                    callbackInner(err, farmers);
                });
            },
            topInvestors: function(callbackInner) {
                User.find({ isActive : 1 }, {firstName : 1, lastName : 1, emailAddress : 1, profileImage : 1, lastYearProfit : 1}).lean().sort({ lastYearProfit: -1 }).limit(5).exec(function(errInv, investors){                                                                                                                            
                    callbackInner(errInv, investors);
                });
            }
        },
        function(err, results) {
            return res.status(200).json({ topFarmers: results.topFarmers, topInvestors: results.topInvestors });
        });
	}

	this.getfarmerDetails = function(req, res){
	    FarmersModel.findOne({ _id : req.params.id}).exec(function(err, farmers) {
			return res.status(200).json({farmers: farmers});		       	
	    });
	}

	this.investOnFarmer = function(req, res){
	    if (!req.payload._id) {
	    	res.status(401).json({message : constants.constUnAuthorizedAccess});
	  	} else {
		    User.findById(req.payload._id).exec(function(err, user) {
				FarmersModel.findOne({ _id : req.body.farmerId }).lean().exec(function(err, farmer) {
               		
               		var newInvestmentLeft = farmer.investmentLeft - req.body.investedAmount;
               		var data = {
                           			userId : user._id.toString(),
                           			firstName : user.firstName, 
						            lastName : user.lastName, 
						            profileImage : "req.body.profileImage", 
						            amountInvested : req.body.investedAmount
                           		};
               		FarmersModel.update({ _id : req.body.farmerId}, { $set: { investmentLeft : newInvestmentLeft }, $push: { investors: data } }).exec();
                	return res.status(200).json({ farmer: farmer });
				})		       	
		    });
	  	}
	}

	this.getAllFarmers = function(req, res){
	    if (!req.payload._id) {
	    	res.status(401).json({message : constants.constUnAuthorizedAccess});
	  	} else {
		    User.findById(req.payload._id).exec(function(err, user) {
				FarmersModel.find({}).lean().exec(function(err, farmers) {
                	return res.status(200).json({ farmers: farmers });
				})		       	
		    });
	  	}
	}

}

module.exports.Investor = Investor;