var express = require('express');
var router = express.Router();
var pg = require('pg');

var connectionString = require('../../database.json').data + '?ssl=true';
//var connectionString = process.env.DATABASE_URL || require('../../database.json').data;


router.post('/', function(request){
    var trackInfo = request.body; //this is an array of objects

    function addProjectNumbers(array){
        var projectCounter = 1;

        for (i = 0; i < array.length; i++){
            array[i].project_number = i+1;
            projectCounter++;
        }
        return array;
    }


    var updateTrack = "UPDATE speech_tracks \
                    SET project_name = $1, project_description = $2, project_number = $3 \
                    WHERE track_name = $4 ";

    pg.connect(connectionString, function(error, client) {
        if(error) {
            console.log(error);
            client.end();
            return response.status(500).json({ success: false, data: error});
        };

        addProjectNumbers(trackInfo);

        for (i = 0; i < trackInfo.length; i++){
            console.log('trackinfo loop:', trackInfo[i].project_name);
            client.query(updateTrack, [trackInfo[i].project_name, trackInfo[i].project_description, trackInfo[i].project_number, trackInfo[i].track_name]);
        };

        client.on('end', function () {
            client.end();
        });
    })
});

module.exports = router;