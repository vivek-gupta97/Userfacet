const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const SurveyController = require('./routes/survey');
const SimilarityController = require('./routes/similarity');
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.json([
		{ surveyName: 'Survey 1', surveyId: 's1' },
		{ surveyName: 'Survey 2', surveyId: 's2' },
	]);
});

app.use('/survey', SurveyController);
app.use('/similarity', SimilarityController);

app.use((error, req, res, next) => {
	const status = error.statusCode || 500;
	const message = error.message;
	res.status(status).json({ message: message });
});
app.listen(port);
