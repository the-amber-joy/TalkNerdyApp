var express = require('express');
var router = express.Router();
var passport = require('passport');
var pg = require('pg');

var connectionString = require('../../database.json').data;
//var connectionString = process.env.DATABASE_URL || require('../../database.json').data;

router.get('/', function(request, response){
    var openRequests = [];
    var user = "Fake";
    //"Fake" needs to be replaced with the google id of the logged-in user

    connectionString = connectionString + '?ssl=true';

    pg.connect(connectionString, function(error, client){
        if (error) {
            console.log(error);
            client.end();
        }

        //This query returns all requested speeches by logged-in user
        var myOpenRequests = "SELECT * FROM speeches WHERE speaker_google_id = $1 AND speech_date IS NULL";

        var query = client.query(myOpenRequests, [user]);

        query.on('error', function (error){
            console.log(error);
            response.sendStatus(500);
        });

        query.on('row', function (row) {
            openRequests.push(row);
        });

        query.on('end', function () {
            client.end();
            return response.json(openRequests);
            console.log(openRequests);
        });
    });
});


module.exports = router;
