var app = require('express');
var passport = require('./passport');

var router = app.Router();


router.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

// the callback after google has authenticated the user
app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect : '/home',
        failureRedirect : '/login'
    }));

module.exports = router;