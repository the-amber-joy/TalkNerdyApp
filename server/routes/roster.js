var express = require('express');
var router = express.Router();
var passport = require('passport');
var pg = require('pg');

var connectionString = require('../../database.json').data;

router.get('/', function(request, response){
    var currentRoster = [];

    connectionString = connectionString + '?ssl=true';

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
            client.end();
            return response.json(currentRoster);
        });
    });
});

module.exports = router;