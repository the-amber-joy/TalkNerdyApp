var express = require('express');
var router = express.Router();
var passport = require('passport');
var pg = require('pg');

var connectionString = require('../../database.json').data + '?ssl=true';
//var connectionString = process.env.DATABASE_URL || require('../../database.json').data;

router.get('/', function(request, response){
    var mySpeeches = [];
    var user = "Fake";
    //"Fake" needs to be replaced with the google id of the logged-in user

    pg.connect(connectionString, function(error, client){
        if (error) {
            console.log(error);
            client.end();
        }

        //This query returns info for all speeches by logged-in req.user
        var queryString = "SELECT * FROM speeches WHERE speaker_google_id = $1";

        var query = client.query(queryString, [user]);

        query.on('error', function (error){
            console.log(error);
            response.sendStatus(500);
        });

        query.on('row', function (row) {
            mySpeeches.push(row);
        });

        query.on('end', function () {
            client.end();
            return response.json(mySpeeches);
            console.log(mySpeeches);
        });
    });
});


module.exports = router;
