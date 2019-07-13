const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const env = require('../env');
const UsersRoute = require('../app/routes/userRoute');
const AdminsRoute = require('../app/routes/adminRoute');
const TeamRoute = require('../app/routes/teamRoute');
const FixtureRoute = require('../app/routes/fixtureRoute');
const SeedRoute = require('../app/routes/seedRoute');
const searchRoute = require('../app/routes/searchRoute');


mongoose
  .connect(`${env.mongodb_url}`, {useNewUrlParser: true, useCreateIndex: true})
  .then(() => {
    console.log('Database successfully connected');

        })
        .catch(err => {
            console.error('error occurred while connecting to the db');
        });



// Add middleware for parsing URL encoded bodies
app.use(cors());

//logger middleware
app.use((req, res,next) => {
  console.log(`[${new Date().toTimeString()}]: ${req.method} ${req.url}`)
  next();
})

// Add middleware for parsing JSON
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api/v1', UsersRoute);
app.use('/api/v1', AdminsRoute);
app.use('/api/v1',  TeamRoute);
app.use('/api/v1',  FixtureRoute);
app.use('/api/v1',  SeedRoute);
app.use('/api/v1',  searchRoute);



app.listen(env.port).on('listening', () => {
  console.log('we are live on ' + env.port);
});


module.exports = app;
