var express = require('express');
var router = express.Router();
var pg = require('pg');

var connectionString = require('../../database.json').data + '?ssl=true';
//var connectionString = process.env.DATABASE_URL || require('../../database.json').data;


router.post('/', function(request){
    var speechRequestObject = request.body;

    var speechRequestQuery = "INSERT INTO speeches \
                    (speech_title, summary, track, track_project, speaker_first_name, speaker_last_name, date_requested, speaker_google_id) \
                    VALUES \
                    ($1, $2, $3, $4, $5, $6, now()::date, $7);";

    pg.connect(connectionString, function(error, client, done) {
        if(error) {
            done();
            console.log(error);
            return response.status(500).json({ success: false, data: error});
        }

        client.query(speechRequestQuery,
            [
                speechRequestObject.speechTitle,
                speechRequestObject.speechBlurb,
                speechRequestObject.selectedTrack,
                speechRequestObject.project,
                speechRequestObject.firstName,
                speechRequestObject.lastName,
                speechRequestObject.google_id
            ]);

        client.on('end', function () {
            client.end();
        });
    })
});



module.exports = router;