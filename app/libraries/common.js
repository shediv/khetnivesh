var Common = function()
{
	var User = require('../models/user').User;
	var underscore = require('underscore');
	var scope = this;

	this.getUserInfo = function(commentsUserIds, callback) {
		User.find({_id : {$in: commentsUserIds}}, { profilePic : 1, email : 1, firstName : 1, lastName : 1}).lean().exec(function(err, userInfo){
			for(i in userInfo) {			
				userInfo[userInfo[i]._id] = userInfo[i];
			}								
			callback(err, userInfo);
		});
	};

	this.getUserNotificationPreference = function(notificationPreferenceIds, callback) {
		NotificationPreference.find({_id : {$in: notificationPreferenceIds}}).lean().exec(function(errNotifications, notifications){
			for(i in notifications) {
				notifications[notifications[i]._id] = notifications[i];
			}								
			callback(errNotifications, notifications);
		});
	};

	this.getUserEmailPreference = function(emailPreferenceIds, callback) {
		EmailPreferenceType.find({_id : {$in: emailPreferenceIds}}).lean().exec(function(errEmailPreferences, emailPreferences){
			for(i in emailPreferences) {
				emailPreferences[emailPreferences[i]._id] = emailPreferences[i];
			}								
			callback(errEmailPreferences, emailPreferences);
		});
	};

	this.getUserPromotionalEmailPreference = function(promoEmailTypes, callback) {
		PromotionalEmail.find({}).lean().exec(function(err, prmoEmailPreferences){
	    		for(var i in promoEmailTypes){
	    			for(var j in prmoEmailPreferences){
	    				if(prmoEmailPreferences[j]._id == promoEmailTypes[i]) {
	    					prmoEmailPreferences[j].set = true;
	    				}	
	    			}
	    		}
	    		callback(err, prmoEmailPreferences);
	    })
	};

	this.getKidAge = function(kidAge) {
		var today = new Date();
	    var birthDate = new Date(kidAge);
	    var age = today.getFullYear() - birthDate.getFullYear();
	    var m = today.getMonth() - birthDate.getMonth();
	    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
	        age--;
	    }
	    return age;
	};

	this.getUsersNicknames = function(userId, callback) {
		Kids.find({"administrators.userID":userId.toString()}, {"administrators.$" : 1}).lean().exec(function(errAdmins, admins){
			var adminNicknames = [];
			for(i in admins){
				for(j in admins[i].administrators){
					adminNicknames.push(admins[i].administrators[j].nickname)
				}
			}

			Kids.find({"collabrators.userID":userId.toString()}, {"collabrators.$" : 1}).lean().exec(function(errCollabs, collabs){
				for(i in collabs){
					for(j in collabs[i].collabrators){
						adminNicknames.push(collabs[i].collabrators[j].nickname)
					}
				}

				adminNicknames = underscore.unique(adminNicknames);
				callback(errAdmins, adminNicknames);
			})
		})
	};

	this.capitalizeFirstLetter = function(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	};
};

module.exports.Common = new Common();
