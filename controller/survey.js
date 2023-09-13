const path = require('path');
const fs = require('fs/promises');

exports.getSurvey = async (req, res, next) => {
	const { name, surveyId } = req.body;
	if (!name || name == '') {
		const err = new Error('Name cannot be empty');
		err.statusCode = 422;
		return next(err);
	}
	const surveys = JSON.parse(
		await fs.readFile(
			path.join(__dirname, '..', 'data', 'surveyQuestions.json')
		)
	);
	if (!surveys[surveyId]) {
		const err = new Error('Invalid Survey ID');
		err.statusCode = 422;
		return next(err);
	}
	res.send(surveys[surveyId]);
};
exports.submitSurvey = async (req, res, next) => {
	const { name, surveyId, response } = req.body;
	const surveys = JSON.parse(
		await fs.readFile(
			path.join(__dirname, '..', 'data', 'surveyQuestions.json')
		)
	);
	if (!surveys[surveyId]) {
		const err = new Error('Invalid Survey ID');
		err.statusCode = 422;
		return next(err);
	}
	if (!response || !(response instanceof Array) || response.length == 20) {
		const err = new Error('Incorrect Response values');
		err.statusCode = 422;
		return next(err);
	}
	const responseFile = JSON.parse(
		await fs.readFile(path.join(__dirname, '..', 'data', 'responses.json'))
	);
	if (!responseFile[surveyId]) {
		responseFile[surveyId] = [];
	}
	responseFile[surveyId].push({ name: name, responses: response });
	await fs.writeFile(
		path.join(__dirname, '..', 'data', 'responses.json'),
		JSON.stringify(responseFile)
	);
	res.status(201).send({ message: 'Survey Submitted Success' });
};
