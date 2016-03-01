var express = require('express');
var router = express.Router();
var passport = require('passport');
var pg = require('pg');

var connectionString = require('../../database.json').data + '?ssl=true';

router.get('/', function(request, response){
    var currentRoster = [];

    pg.connect(connectionString, function(error, client){
        if(error) {
            console.log(error);
        }

        //this query returns all current members on roster
        var queryString = "SELECT first_name, last_name, role \
                            FROM roster";

        var query = client.query(queryString);

        query.on('error', function (error){
            console.log(error);
            response.sendStatus(500);
        });

        query.on('row', function (row) {
            currentRoster.push(row);
        });

        query.on('end', function () {
            response.send(currentRoster);
            client.end();
        });

        router.post('/', function(request, response) {

            var updateRosterQuery = "INSERT INTO roster \
                    (first_name, role) \
                    VALUES \
                    ($1, $2)";
        })
    });
});

module.exports = router;