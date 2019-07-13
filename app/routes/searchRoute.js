const express = require('express');
const router = express.Router();
const TeamController = require('../controllers/teamController');
const FixtureController = require('../controllers/fixtureController');
const UserAuthMiddleware = require('../middlewares/userAuth');

//subjects Routes
router.get('/user/team/search', UserAuthMiddleware,  TeamController.searchTeams);
router.get('/search/fixtures', UserAuthMiddleware, FixtureController.searchFixtures);

module.exports = router;
