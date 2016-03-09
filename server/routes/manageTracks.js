var express = require('express');
var router = express.Router();
var pg = require('pg');

var connectionString = require('../../database.json').data + '?ssl=true';
//var connectionString = process.env.DATABASE_URL || require('../../database.json').data;


router.get('/', function(request, response){

    pg.connect(connectionString, function(error, client){
        if (error) {
            console.log(error);
            client.end();
        }

        var tracks = [];

        var query = client.query("SELECT DISTINCT track_name FROM speech_tracks");

        query.on('error', function (error){
            console.log(error);
            response.sendStatus(500);
        });

        query.on('row', function (row) {
            tracks.push(row);
        });

        query.on('end', function () {
            console.log(tracks);
            client.end();
            return response.json(tracks);
        });
    });
});


router.post('/', function(request, response){
    trackInfo = request.body; //the projects to be updated
    console.log('trackInfo:', trackInfo);

    var refreshTrack = "DELETE FROM speech_tracks WHERE track_name = $1";
    var updateTrack = "INSERT INTO speech_tracks (project_name, project_description, project_number, track_name) VALUES ($1, $2, $3, $4);";

    function addProjectNumbers(array){
        var projectCounter = 1;

        for (var i = 0; i < array.length; i++){
            array[i].project_number = i+1;
            projectCounter++;
        }
        return array;
    }

    addProjectNumbers(trackInfo);

    pg.connect(connectionString, function(error, client) {
        if(error) {
            console.log(error);
            client.end();
            return response.status(500).json({ success: false, data: error});
        }

        client.query(refreshTrack, [trackInfo[0].track_name]);

        for (var i = 0; i < trackInfo.length; i++){
            client.query(updateTrack, [
                trackInfo[i].project_name,
                trackInfo[i].project_description,
                trackInfo[i].project_number,
                trackInfo[i].track_name
            ]);
        }

        client.on('end', function () {
            client.end();
            response.sendStatus(200);
        });
    })
});

module.exports = router;