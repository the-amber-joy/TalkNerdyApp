var express = require('express');
var router = express.Router();
var pg = require('pg');

var connectionString = require('../../database.json').data + '?ssl=true';
//var connectionString = process.env.DATABASE_URL || require('../../database.json').data;

router.get('/', function(request, response){
    var projects = [];

    pg.connect(connectionString, function(error, client){
        if (error) {
            console.log(error);
            client.end();
        }

        var query = client.query("SELECT * FROM speech_tracks ORDER BY project_number ASC");

        query.on('error', function (error){
            console.log(error);
            response.sendStatus(500);
        });

        query.on('row', function (row) {
            projects.push(row);
        });

        query.on('end', function () {
            //console.log(projects);
            client.end();
            return response.json(projects);
        });
    });
});


module.exports = router;
