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
        var queryString = "SELECT first_name, last_name, role, isadmin \
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
    console.log('request.body contents:', request.body);

    var updateRosterQuery = "UPDATE roster SET role = $1 isAdmin = $2 WHERE first_name = $3 AND last_name = $4";
    pg.connect(connectionString, function(error, client){

        if(error) {
            done();
            console.log(error);
            return response.status(500).json({ success: false, data: error})
            }

        client.query(updateRosterQuery, [rosterUpdate]);


        client.on('end', function () {
            client.end();
        });
    });

});


module.exports = router;