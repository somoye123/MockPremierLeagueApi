const express = require('express');
const router = express.Router();
const TeamController = require('../controllers/teamController');
const AdminAuth = require('../middlewares/adminAuth');
const UserAuth = require('../middlewares/userAuth');
// const redisMiddleWare = require('../middlewares/webCache')

//subjects Routes
// Admin Teams Route

router.post('/team/add', AdminAuth, TeamController.addTeams);
router.get('/teams', AdminAuth, TeamController.viewTeams);
router.put('/team/update/:slug', AdminAuth, TeamController.updateTeams);
router.delete('/team/delete/:slug', AdminAuth, TeamController.removeTeams);

// User Teams Route
router.get('/user/teams', UserAuth, TeamController.viewTeams);


module.exports = router;

