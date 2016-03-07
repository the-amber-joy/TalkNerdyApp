var express = require('express');
var router = express.Router();
var pg = require('pg');

var connectionString = require('../../database.json').data + '?ssl=true';
//var connectionString = process.env.DATABASE_URL || require('../../database.json').data;


router.post('/', function(request){
    var trackInfo = request.body;
    console.log('trackInfo:', trackInfo);

    function addProjectNumbers(foo){
        var projectCounter = 1;
        for (i = 1; i < foo.length+1; i++){
            foo[i].project_number = i;
            projectCounter++;
        }
        return trackInfo;
    }

    var updateTrack = "INSERT INTO speech_tracks \
                    (track_name, project_name, project_description, project_number) \
                    VALUES \
                    ($1, $2, $3, $4);";

    pg.connect(connectionString, function(error, client) {
        if(error) {
            console.log(error);
            client.end();
            return response.status(500).json({ success: false, data: error});
        }

        client.query(updateTrack, [addProjectNumbers(trackInfo)]);

        client.on('end', function () {
            client.end();
        });
    })
});

module.exports = router;