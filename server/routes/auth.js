var app = require('express');
var path = require('path');
//var passportRoute = require('./passportRoute');
var passport = require('passport');
var pg = require('pg');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
require('dotenv').config();
var connectionString = require('../../database.json').data + '?ssl=true';

var router = app.Router();

pg.on('error', function (err) {
    console.log('Database error!', err);
});

var currentUser = {};
var status = {};
var admin = false;

// used to serialize the user for the session
passport.serializeUser(function(user, done) {
    status = user.role;
    admin = user.isadmin;
    console.log('Serialized User status: ', status, "| Is user admin? ", admin);
    done(null, user.id, status, admin);
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
    console.log('Deserialized User ID', id);
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

passport.use('google', new GoogleStrategy({

    clientID: process.env.clientID,
    clientSecret: process.env.clientSecret,
    callbackURL: process.env.callbackURL

}, function (token, refreshToken, profile, done) {

    // make the code asynchronous
    // User.findOne won't fire until we have all our data back from Google
    //process.nextTick(function () {

    // try to find the user based on their google id
    // Check DB for user and authenticate or add user to DB if not there


    //[[[[[[[[[[[[[[[[[[[[[[[[ SQL will go here ]]]]]]]]]]]]]]]]]]]]]]]]]]]]]


// Returns the entire list of people

    //var queryOptions = {
     var userEmail = profile.emails[0].value;
     var userFirstName = profile.name.givenName;
     var userLastName = profile.name.familyName;
     var userGoogleID = profile.id;
    //};

    //Trying to find a user
    pg.connect(connectionString, function (err, client) {
        if (err) throw err;

        var foundUser = {};
        var userFound = false;
        var newUser = {};

        console.log('Profile ID, Right before query', profile.id);
        if (profile.id) {
            var query = client.query("SELECT * FROM roster WHERE google_id = $1", [profile.id]);
            //return query.row;
            query.on('row', function (row) {
                currentUser = row;
                foundUser = row;
                userFound = true;

            });
            // After all data is returned, close connection and return results
            query.on('end', function () {
                if (userFound) {
                    done(null, foundUser);
                    client.end();


                } else {

                    console.log(userEmail, userFirstName, userLastName, userGoogleID);

                    var newQuery = client.query("INSERT INTO roster (email, first_name, last_name, google_id) " +
                        "VALUES ($1, $2, $3, $4) RETURNING * ", [userEmail, userFirstName, userLastName, userGoogleID]);

                    newQuery.on('row', function (row) {
                        //console.log(row);
                      newUser = row;
                        currentUser = row;
                    });

                    newQuery.on('end', function () {
                        //console.log(newUser);
                        client.end();
                        done(null, newUser);
                    });

                }

            });

        }

});


}));

router.get('/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
//
// the callback after google has authenticated the user
router.get('/google/callback',

    passport.authenticate('google', {
        successRedirect : '/index',
        failureRedirect : '/login'
    }));

router.get('/currentUser', function(request, response){
  response.send(currentUser);
});


module.exports = router;
