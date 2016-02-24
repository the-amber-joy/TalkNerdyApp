var app = require('express');
var path = require('path');
//var passportRoute = require('./passportRoute');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
require('dotenv').config();


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



    //    User.findOne({'google.id': profile.id}, function (err, user) {
    //        if (err)
    //            return done(err);
    //
    //        if (user) {
    //
    //            // if a user is found, log them in
    //            return done(null, user);
    //        } else {
    //            // if the user isnt in our database, create a new user
    //            var newUser = new User();
    //
    //            // set all of the relevant information
    //            newUser.google.id = profile.id;
    //            newUser.google.token = token;
    //            newUser.google.name = profile.displayName;
    //            newUser.google.email = profile.emails[0].value; // pull the first email
    //
    //            // save the user
    //            newUser.save(function (err) {
    //                if (err)
    //                    throw err;
    //                return done(null, newUser);
    //            });
    //        }
    //    });
    //});

    done(null, {username: 'blah', password: 'blahblah', id:1})

}));


router.get('/home', function(request, response){
    response.sendFile(path.join(__dirname, '../public/views/home.html'));
});

router.get('/login', function(request, response){
    response.sendFile(path.join(__dirname, '../public/views/login.html'));
});


router.get('/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
//
// the callback after google has authenticated the user
router.get('/google/callback',
    passport.authenticate('google', {
        successRedirect : '/index',
        failureRedirect : '/login'
    }));

//router.get('/google/callback',
//    passport.authenticate('google', { failureRedirect: '/auth/login' }),
//    function(req, res) {
//        // Successful authentication, redirect home.
//        console.log('success');
//        res.redirect('/index');
//    });

//router.get('/google/callback', function(request, response){
//    response.sendFile(path.join(__dirname, '../public/views/home.html'));
//});

module.exports = router;