const FixtureModel = require('../models/fixtureModel');

const addFixtures = async (req, res) => {
    try {
        const fixture = await FixtureModel.create(req.body);
        const response = fixture.toJSON();

        res.status(200).json({
            status: "ok",
            message: "Fixture created successfully",
            data: { fixture: response },
        });
    } catch (err) {
        console.log(err);
        if (err.code === 11000){
            res.status(409).json({
                status: "Error",
                message: "Fixture already exists"
            });
        } else {
            res.status(500).json({
                status: "Error",
                message: "An error occurred while trying to create a fixture"
            });
        }

    }
};


const editFixtures = async (req, res) => {
    try {
        const fixtureSlug= req.params.slug
        const fixture = await FixtureModel.findOne({slug: fixtureSlug}, (err, fixture) => {
            if (err) {
                res.status(404).json({
                    status: "Error",
                    message: "Fixture does not exist"
                })
            }
        });
        if (!fixture) {
            res.status(404).json({
                status: "Error",
                message: "Fixture does not exist"
            })
        }
        res.status(200).json({
            status: "Success",
            messages: "fixture edited successfully",
            data: {fixture}
        });
    } catch (err) {
        console.log(err);

        res.status(500).json({
            status: "Error",
            message: "Fixture does not exist"
        });
    }
};

const pendingFixtures =  async (req, res) => {
    try {
        const fixtures = await FixtureModel.find({match_status: 'pending'});

        if (fixtures === undefined || fixtures.length === 0) {
            res.status(404).json({
                status: "Error",
                message: "Pending fixtures not found"
            })
        }
        res.status(200).json({
            status: "Success",
            message: "Pending fixtures found!!",
            data: {fixtures}
        });
    } catch (err) {
        console.log(err);

        res.status(500).json({
            status: "Error",
            message: "An error occurred"
        });
    }
};

const searchFixtures =  async (req, res) => {
    try {
        const teamName = req.body.team_name;
        const fixtures = await FixtureModel.find({$or: [ { home_team: teamName }, { away_team: teamName}]});

        if (fixtures === undefined || fixtures.length === 0) {
            res.status(404).json({
                status: "Error",
                message: "No fixtures found"
            })
        }
        res.status(200).json({
            status: "Success",
            message: 'Successfully found fixtures',
            data: {fixtures}
        });
    } catch (err) {
        console.log(err);

        res.status(500).json({
            status: "Error",
            message: "An error occurred"
        });
    }
};

const completedFixtures =  async (req, res) => {
    try {
        const fixtures = await FixtureModel.find({match_status: 'completed'});
        if (fixtures === undefined || fixtures.length === 0) {
            res.status(404).json({
                status: "Error",
                message: "An error occurred, no fixtures found"
            })
        }

        res.status(200).json({
            status: "Success",
            message: "Fixtures found successfully",
            data: {fixtures}
        });
    } catch (err) {
        console.log(err);

        res.status(500).json({
            status: "Error",
            message: "An error occurred"
        });
    }
};

const viewFixtures = async (req, res) => {
    try {
        const fixtures = await FixtureModel.find();
        if (!fixtures) {
            res.status(404).json({
                status: "Error",
                message: "Fixtures not found"
            })
        }
        res.status(200).json({
            status: "Success",
            message: "You can now view fixtures",
            data: {fixtures}
        });
    } catch (err) {
        console.log(err);

        res.status(500).json({
            status: "Error",
            message: "An error occurred"
        });
    }
};

const updateFixtures = async (req, res) => {
    try {
        const fixtureSlug= req.params.slug
        const fixture = await FixtureModel.findOne({slug: fixtureSlug}, (err, fixture) => {
            if (err) {
                res.status(404).json({
                    status: "Error",
                    message: "An error occured while trying to edit fixtures"
                })
            }
        });
        if (!fixture) {
            res.status(404).json({
                status: "Error",
                message: "An error occured"
            })
        } else {
            fixture.home_team = req.body.home_team;
            fixture.away_team = req.body.away_team;
            fixture.home_team_scores = req.body.home_team_scores;
            fixture.away_team_scores = req.body.away_team_scores;
            fixture.match_period = req.body.match_period;
            fixture.match_date = req.body.match_date;
            fixture.match_week = req.body.match_week;
            fixture.match_time = req.body.match_time;
            fixture.match_stadium = req.body.match_stadium;
            fixture.match_status = req.body.match_status
            fixture.save();
        }
        res.status(200).json({
            status: "Success",
            messages: "Teams updated successfully",
            data: {fixture}
        });
    } catch (err) {
        console.log(err);

        res.status(500).json({
            status: "Error",
            message: "An error occurred"
        });
    }
};


const removeFixtures = async (req, res) => {
    try {
        const fixtureSlug= req.params.slug
        const findFixture = await FixtureModel.findOne({slug: fixtureSlug}, (err, fixture) => {
            if (err) {
                res.status(404).json({
                    status: "Error",
                    message: "An error occurred"
                })
            }
        });
        if (!findFixture) {
            res.status(404).json({
                status: "Error",
                message: "An error occurred"
            })
        }

        const fixture = await FixtureModel.findOneAndDelete({slug: fixtureSlug}, (err, fixture) => {
            if (err) {
                res.status(404).json({
                    status:  "Error",
                    message: "An error occurred"
                })
            }
        });
        if (!fixture) {
            res.status(200).json({
                status: "Success",
                message: "Successfully removed fixtures"
            })
        }

    } catch (err) {
        console.log(err);

        res.status(500).json({
            status: "Error",
            message: "An error occurred while trying to remove fixtures"
        });
    }
};


module.exports = {
    addFixtures,
    editFixtures,
    updateFixtures,
    removeFixtures,
    viewFixtures,
    pendingFixtures,
    completedFixtures,
    searchFixtures
};
