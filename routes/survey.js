const { Router } = require('express');

const SurveyController = require('../controller/survey');

const router = Router();
router.post('/', SurveyController.getSurvey);
router.post('/submit', SurveyController.submitSurvey);

module.exports = router;
