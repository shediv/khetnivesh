/*
    Description : This model is for class collection.
*/
var mongoose = require('mongoose');

var farmersModel = mongoose.model('farmers', new mongoose.Schema({},{strict : false}));

module.exports = { FarmersModel: farmersModel };
