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
        var queryString = "SELECT first_name, last_name, role, isadmin, id \
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

    });
});

router.post('/', function(request, response){
    var rosterUpdate = request.body;
    console.log('request.body contents:', rosterUpdate);

    var updateRosterQuery = "UPDATE roster SET role = $1, isadmin = $2 WHERE id = $3";
    pg.connect(connectionString, function(error, client){


        var query = client.query(updateRosterQuery, [rosterUpdate.hasRole, rosterUpdate.isAdmin, rosterUpdate.id]);

        query.on('error', function (error){
            console.log(error);
            response.sendStatus(500);
        });

        query.on('end', function () {
            response.sendStatus(200);
            client.end();

        });
    });

});

router.post('/names', function(request, response){
    var nameUpdate = request.body;

    var updateRosterQuery = "UPDATE roster SET first_name = $1, last_name = $2 WHERE id = $3";
    pg.connect(connectionString, function(error, client){


        var query = client.query(updateRosterQuery, [nameUpdate.firstName, nameUpdate.lastName, nameUpdate.id]);

        query.on('error', function (error){
            console.log(error);
            response.sendStatus(500);
        });

        query.on('end', function () {
            response.sendStatus(200);
            client.end();

        });
    });

});

module.exports = router;