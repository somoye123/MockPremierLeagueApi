const TeamsModel = require('../models/teamModel');

const addTeams = async (req, res) => {
    try {
        const team = await TeamsModel.create(req.body);
        const response = team.toJSON();

        res.status(200).json({
            status: "Success",
            message: "Teams successfully added",
            data: { team: response },
        });
    } catch (err) {
        console.log(err);

        if (err.code === 11000){
            res.status(409).json({
                status: "Error",
                message: "An error occurred, Already exists"
            });
        } else {
            res.status(500).json({
                status: "An error occurred",
                message: "An error occurred while adding teams"
            });
        }
    }
};


const editTeams = async (req, res) => {
    try {
        const teamSlug= req.params.slug;
        const team = await TeamsModel.findOne({slug: teamSlug}, (err, team) => {
            if (err) {
                res.status(404).json({
                    status: "Error",
                    message: "An error occurred, Team does not exists"
                })
            }
        });
        if (!team) {
            res.status(404).json({
                status: "Error",
                message: "An error occurred, Team does not exists"
            })
        }
        res.status(200).json({
            status: "Success",
            messages: "Team successfully edited",
            data: {team}
        });
    } catch (err) {
        console.log(err);

        res.status(500).json({
            status: "Error",
            message: "An error occurred while trying edit teams"
        });
    }
};

const viewTeams = async (req, res) => {
    try {
        const teams = await TeamsModel.find();
        if (!teams) {
            res.status(404).json({
                status: "Error",
                message: "An error occurred, no teams to view"
            })
        }
        res.status(200).json({
            status: "Success",
            message: "Team found successfully",
            data: {teams}
        });
    } catch (err) {
        console.log(err);

        res.status(500).json({
            status: "Error",
            message: "An error occurred"
        });
    }
};

const updateTeams = async (req, res) => {
    try {
        const teamSlug = req.params.slug
        const team = await TeamsModel.findOne({slug: teamSlug}, (err, team) => {
            if (err) {
                res.status(404).json({
                    status: "Error",
                    message: "An error occurred, team not found"
                })
            }
        });
        if (!team) {
            res.status(404).json({
                status: "Error",
                message: "An error occurred while trying to update teams"
            })
        } else {
            team.team_name = req.body.team_name;
            team.manager = req.body.manager;
            team.website = req.body.website;
            team.founder = req.body.founder;
            team.stadium = req.body.stadium;
            team.save();
        }
        res.status(200).json({
            status: "Success",
            messages: "Successfully updated teams",
            data: {team}
        });
    } catch (err) {
        console.log(err);

        res.status(500).json({
            status: "Success",
            message: "An error occurred"
        });
    }
};

const searchTeams =  async (req, res) => {
    try {
        const teamName = req.body.team_name;
        const team = await TeamsModel.findOne({team_name: teamName}, (err, team) => {
            if (err) {
                res.status(404).json({
                    status: "Error",
                    message: "An error occurred, team not found"
                })
            }
        });

        if (team === undefined || team === null ) {
            res.status(404).json({
                status: "Error",
                message: "An error occurred no teams found"
            })
        }
        res.status(200).json({
            status: "Success",
            message: "Successfully found teams",
            data: {team}
        });
    } catch (err) {
        console.log(err);

        res.status(500).json({
            status: "Error",
            message: "An error occurred, no teams found"
        });
    }
};


const removeTeams = async (req, res) => {
    try {
        const teamSlug = req.params.slug
        const findTeam = await TeamsModel.findOne({slug: teamSlug}, (err, team) => {
            if (err) {
                res.status(404).json({
                    status: "Error",
                    message: "An error occurred, teams not found"
                })
            }
        });
        if (!findTeam) {
            res.status(404).json({
                status: "Error",
                message: "An error occurred while trying to update teams"
            })
        }

        const team = await TeamsModel.findOneAndDelete({slug: teamSlug}, (err, team) => {
            if (err) {
                res.status(404).json({
                    status: "Error",
                    message: "Successfully edited teams"
                })
            }
        });
        if (!team) {
            res.status(200).json({
                status: "Success",
                message: "Successfully deleted teams"
            })
        }
    } catch (err) {
        console.log(err);

        res.status(500).json({
            status: "Error",
            message: "An error occurred while trying to remove teams"
        });
    }
};


module.exports = {
    addTeams,
    editTeams,
    updateTeams,
    removeTeams,
    viewTeams,
    searchTeams
};
