const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('Question', new mongoose.Schema({
	question : String,
	options : [
	{
		name : String,
		label : String,
		value : Number
	}],
	correctAnswer : String,
	givenAnswer : String
}, {timestamp : true}
))