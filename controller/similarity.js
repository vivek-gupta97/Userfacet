const fs = require('fs/promises');
const path = require('path');
exports.getSimilarity = async (req, res, next) => {
	const name = req.query.name;
	const filter = req.query.filter;
	const page = req.query.page || 1;
	const search = req.query.search;
	const surveyId = req.params.surveyId;

	const responseFile = JSON.parse(
		await fs.readFile(path.join(__dirname, '..', 'data', 'responses.json'))
	);
	let usrRes;
	for (const r of responseFile[surveyId]) {
		if (r.name === name) {
			usrRes = r;
			break;
		}
	}
	if (!usrRes) {
		const err = new Error('No response found for the given name');
		err.statusCode = 422;
		return next(err);
	}
	let sim = responseFile[surveyId].map((r) => {
		const { name, responses } = r;
		let sim,
			total = 0,
			count = 0;
		for (let i = 0; i < 20; i++) {
			if (usrRes.responses[i] != 0 && responses[i] != 0) {
				if (usrRes.responses[i] == responses[i]) {
					count++;
				}
				total++;
			}
		}
		return { name: name, sim: total > 0 ? (count / total) * 100 : 0 };
	});
	if (search && search != '') {
		sim = sim.filter((r) => {
			return r.name === search;
		});
	}
	if (filter && filter != '') {
		let rangeL, rangeR;
		switch (filter) {
			case 'high':
				rangeL = 60;
				rangeR = 100;
				break;
			case 'med':
				rangeL = 30;
				rangeR = 60;
				break;
			case 'low':
				rangeL = 0;
				rangeR = 30;
				break;
		}
		sim = sim.filter((r) => {
			return r.sim >= rangeL && r.sim <= rangeR;
		});
	}

	sim = sim.slice((page - 1) * 5, 5 * page);
	res.json(sim);
};
