var app = require('express');
var path = require('path');
//var passportRoute = require('./passportRoute');
var passport = require('passport');
var pg = require('pg');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
require('dotenv').config();
var connectionString = require('../../database.json').data;


var router = app.Router();

// used to serialize the user for the session
passport.serializeUser(function(user, done) {
    console.log('Serialized User', user);
    done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
    console.log('Deserialized User', id);
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
    console.log('Google ID# ', profile.id);
    console.log('Last Name: ', profile.name.familyName);
    console.log('First Name: ', profile.name.givenName);
    console.log('e-mail: ', profile.emails[0].value);
    console.log('Token: ', token);
    //});


    //[[[[[[[[[[[[[[[[[[[[[[[[ SQL will go here ]]]]]]]]]]]]]]]]]]]]]]]]]]]]]

connectionString = connectionString + '?ssl=true';

// Returns the entire list of people

    //var queryOptions = {
     var userEmail = profile.emails[0].value;
     var userFirstName = profile.firstName;
     var userLastName = profile.name.familyName;
     var userGoogleID = profile.id;
    //};

    //Trying to find a user
    pg.connect(connectionString, function (err, client) {
        if (err) throw err;

        var foundUser = {};
        var userFound = false;

        console.log('Right before query', profile.id);
        if (profile.id) {
            var query = client.query("SELECT * FROM roster WHERE google_id = $1", [profile.id]);
            //return query.row;
            console.log("This is working");
            query.on('row', function (row) {

                console.log('Entered Row');
                foundUser = row;
                userFound = true;

            });
            // After all data is returned, close connection and return results
            query.on('end', function () {
                if (userFound) {
                    console.log(userFound);
                    done(null, foundUser);
                    client.end();


                } else {

                    var newQuery = client.query("INSERT INTO roster (email, first_name, last_name, google_id) " +
                        "VALUES ('userEmail','userFirstName', 'userLastName', 'userGoogleID'");

                    newQuery.on('row', function (row) {
                        var newUser = row;
                       return done(null, newUser);
                    });

                    newQuery.on('end', function (row) {
                        client.end();
                    });

                }

            });

        }

});

    done(null, {username: 'blah', password: 'blahblah', id:1})

}));

router.get('/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
//
// the callback after google has authenticated the user
router.get('/google/callback',

    passport.authenticate('google', {
        successRedirect : '/index',
        failureRedirect : '/login'
    }));


module.exports = router;
