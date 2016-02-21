var app = require('express');
var passport = require('./passportRoute');

var router = app.Router();


//router.get('/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
//
//// the callback after google has authenticated the user
//app.get('/auth/google/callback',
//    passport.authenticate('google', {
//        successRedirect : '/home',
//        failureRedirect : '/login'
//    }));

router.get('/google', function(){
    console.log('Google request made');
});


module.exports = router;