const express = require('express');
const router = express.Router();
const seedController = require('../controllers/seedController')

router.get('/admin/seed',  seedController.seedAdmins);
router.get('/user/seed',  seedController.seedUsers);
router.get('/team/seed',  seedController.seedTeams);
router.get('/fixture/seed',  seedController.seedFixtures);

module.exports = router;
