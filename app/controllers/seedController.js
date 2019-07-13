const AdminsModel = require('../models/adminModel');
const FixtureModel = require('../models/fixtureModel');
const TeamsModel = require('../models/teamModel');
const UsersModel = require('../models/userModel');



const seedUsers = (req, res) => {
    // create some events
    const users = [
        { first_name: 'Somoye',  last_name: 'Ayotunde', email: 'somoye.ayotunde@gmail.com', password: 'somoye'  },
        { first_name: 'Karan',  last_name: 'Dhilion', email: 'karanpal@gmail.com', password: 'karan'  },
        { first_name: 'Opeyemi',  last_name: 'Adekunle', email: 'opeyemi@gmail.com', password: 'adekunle'  },
        { first_name: 'oluwaseun',  last_name: 'peter', email: 'wapjos@gmail.com', password: 'emmanuel'  },
        { first_name: 'niran',  last_name: 'olawale', email: 'olawale@gmail.com', password: 'olawale'  },
        { first_name: 'caroline',  last_name: 'taiwo', email: 'caroline@gmail.com', password: 'caroline'  },

    ];

    // use the User model to insert/save
    UsersModel.remove({}, () => {
        for (user of users) {
            const newUser = new UsersModel(user);
            newUser.save();
        }
    });

    // seeded!
    res.send('Users Database seeded!');
}

const seedAdmins = (req, res) => {
    // create some events
    const admins = [
        { first_name: 'Esther',  last_name: 'oyeniyi', email: 'estheroyeniyi@gmail.com', password: 'fggzdges', is_admin: true  },
        { first_name: 'Peter',  last_name: 'kehinde', email: 'peterkehinde@gmail.com', password: 'gjjdzfzfasfe', is_admin: true  },
        { first_name: 'Oyewo',  last_name: 'idahosa', email: 'oyewoidahosa@gmail.com', password: 'gfhcgghjtf', is_admin: true  },
    ];

    // use the Admin model to insert/save
    AdminsModel.remove({}, () => {
        for (admin of admins) {
            const newAdmin = new AdminsModel(admin);
            newAdmin.save();
        }
    });

    // seeded!
    res.send('Admin Database seeded!');
}

const seedTeams = (req, res) => {
    // create some events
    const teams = [
        { team_name: 'Chelsea',  manager: 'Chelsea Manager', website: 'https://www.chelsea.com', stadium: 'Chelsea Stadium'},
        { team_name: 'Liverpool',  manager: 'Liverpool Manager', website: 'https://www.liverpool.com', stadium: 'Liverpool Stadium'},
        { team_name: 'New Castle',  manager: 'New Castle Manager', website: 'https://www.newcastle.com', stadium: 'New Castle Stadium'},
        { team_name: 'Arsenal',  manager: 'Arsenal Manager', website: 'https://www.arsenal.com', stadium: 'Arsenal Stadium'},
        { team_name: 'Everton',  manager: 'Everton Manager', website: 'https://www.everton.com', stadium: 'Everton Stadium'},

    ];

    // use the Team model to insert/save
    TeamsModel.remove({}, () => {
        for (team of teams) {
            const newTeam = new TeamsModel(team);
            newTeam.save();
        }
    });

    // seeded!
    res.send('Team Database seeded!');
}


const seedFixtures = (req, res) => {
    // create some events
    const fixtures = [
        { home_team: 'Liverpool',  away_team: 'Arsenal', match_date: 16-7-2019, match_week: 19, match_time: '11:00', match_stadium: 'Old Trafford'},
        { home_team: 'New Castle',  away_team: 'Arsenal', match_date: 27-7-2019, match_week: 14, match_time: '16:00', match_stadium: 'Wembley'},
        { home_team: 'Arsenal',  away_team: 'Chelsea', match_date: 19-7-2019, match_week: 12, match_time: '14:00', match_stadium: 'Stadium'},
        { home_team: 'Chelsea',  away_team: 'Arsenal', match_date: 9-7-2019, match_week: 6, match_time: '19:00', match_stadium: 'Wembley'},
        { home_team: 'Everton',  away_team: 'Chelsea', match_date: 1-7-2019, match_week: 8, match_time: '16:00', match_stadium: 'Old Trafford'},


    ];

    // use the Fixture model to insert/save
    FixtureModel.remove({}, () => {
        for (fixture of fixtures) {
            const newFixture = new FixtureModel(fixture);
            newFixture.save();
        }
    });

    // seeded!
    res.send('Fixture Database seeded!');
}


module.exports = {
    seedAdmins,
    seedFixtures,
    seedTeams,
    seedUsers
}

