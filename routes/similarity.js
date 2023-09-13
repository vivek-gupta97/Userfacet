const { Router } = require('express');

const SimilarityController = require('../controller/similarity');

const router = Router();
router.get('/:surveyId', SimilarityController.getSimilarity);

module.exports = router;
