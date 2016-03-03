var express = require('express');
var router = express.Router();
var pg = require('pg');

var connectionString = require('../../database.json').data + '?ssl=true';
//var connectionString = process.env.DATABASE_URL || require('../../database.json').data;


router.post('/', function(request){
    var newTrack = request.body;
    //console.log('newTrack:', newTrack);

    var newTrackCreation = "INSERT INTO speech_tracks \
                    (track_name, project_name, project_description) \
                    VALUES \
                    ($1, $2, $3);";

    pg.connect(connectionString, function(error, client, done) {
        if(error) {
            done();
            console.log(error);
            return response.status(500).json({ success: false, data: error});
        }

        client.query(newTrackCreation,
            [
                newTrack.trackName,
                newTrack.projectName,
                newTrack.projectDescription
            ]);

        client.on('end', function () {
            client.end();
        });
    })
});

module.exports = router;