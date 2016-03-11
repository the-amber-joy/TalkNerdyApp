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

router.post('/', function(request, response){

    var selectedProjects = [];
    var selectedTrack = request.body.track;

    pg.connect(connectionString, function(error, client) {
        if (error) {
            client.end();
            console.log(error);
            return response.status(500).json({ success: false, data: error});
        }

        //Query to get all projects associated with the selected track
        var theseProjects = "SELECT * FROM speech_tracks WHERE track_name = $1 ORDER BY project_number ASC";

        var query = client.query(theseProjects, [selectedTrack]);

        query.on('error', function(error){
            client.end();
            console.log(error);
            return response.status(500).json({ success: false, data: error});
        });

        query.on('row', function (row) {
            selectedProjects.push(row);
        });

        query.on('end', function () {
            client.end();
            return response.json(selectedProjects);
        });
    });
});

module.exports = router;
