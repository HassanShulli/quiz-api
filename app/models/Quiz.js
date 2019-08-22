const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-page');
var timestamps = require('mongoose-timestamp');

const QuizSchema = new mongoose.Schema({
	name : String,
	questions: [{
        type: Schema.Types.ObjectId,
        ref: 'Question',
        default: null
	}]
})

QuizSchema.plugin(timestamps);
QuizSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Quiz', QuizSchema);