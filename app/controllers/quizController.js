const Quiz = require('../models/Quiz');

exports.create = function (req, res) {

	var newQuiz = {
		name : req.body.name,
		questions : req.body.questions
	}

	const myQuiz = new Quiz(newQuiz);

	myQuiz.save((err, quiz) => {
		if (err) {
            res.json({success: false, result: [], messages: [err.message]});
		} else {
            res.json({success: true, result: quiz, messages: []});
        }
	})
}

exports.read = function (req, res) {

	const responseJSON = {success: false, result: [], messages: [], pagination: []}
    
    let queryOptions = {};
    let query = {};

    queryOptions = {
            page: req.query.pageIndex ? req.query.pageIndex * 1 : 1,
            limit: req.query.limit ? req.query.limit * 1 : 10,
  			populate: 'questions',
            sort: '-updatedAt'
        }    

        console.log('queryOptions.page : ', queryOptions.page, 'Type : ', typeof queryOptions.page);
        console.log('queryOptions.limit : ', queryOptions.limit, 'Type : ', typeof queryOptions.limit);

	Quiz.paginate(query, queryOptions)
        .then(function (queryResult) {

            responseJSON.success = true;
                responseJSON.docs = queryResult.docs;
                responseJSON.pagination = {
                    total: queryResult.total,
                    limit: queryResult.limit,
                    page: queryResult.page,
                    pages: queryResult.pages
                };
                res.status(200).json(responseJSON)
    })
}

exports.update = function (req, res) {
    console.log('req.body Update-- : ', req.body);

	var updatedQuiz = {
		name : req.body.name,
		questions : req.body.questions
	}

	Quiz.update({"_id": req.body._id}, {$set: updatedQuiz},
		function (err, quiz) {
			if (err) {
				res.json({success: false, result: [],messages: [err.messages]});
			} else {
                res.json({success: true, result: quiz, messages: []});
			}
		});
}

exports.delete = function (req, res) {
    Quiz.remove({"_id": req.params.id},
        function (err, quiz) {
            if (err) {
                res.json({success: false, result: [], messages: [err.message]});
            } else {
                res.json({success: true, result: quiz, messages: []});
            }
        })
};