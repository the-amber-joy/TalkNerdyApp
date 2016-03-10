//This is where a scheduled meeting is re-queued by removing the date
// removes previously assigned meeting date from the selected speech, and puts speech back in queue to be assigned a meeting date

var express = require('express');
var router = express.Router();
var pg = require('pg');

var connectionString = require('../../database.json').data + '?ssl=true';
//var connectionString = process.env.DATABASE_URL || require('../../database.json').data;


router.post('/', function(request) {

    console.log('request', request);

    var resetSpeech = "UPDATE speeches SET speech_date = NULL WHERE id = $1";

    pg.connect(connectionString, function (error, client, done) {
        if (error) {
            done();
            console.log(error);
            return response.status(500).json({success: false, data: error});
        }

        client.query(resetSpeech, [request.body.id]);

        client.on('end', function () {
            client.end();

        })
    });
});

module.exports = router;

