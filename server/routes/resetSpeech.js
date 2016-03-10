var express = require('express');
var router = express.Router();
var pg = require('pg');

var connectionString = require('../../database.json').data + '?ssl=true';
//var connectionString = process.env.DATABASE_URL || require('../../database.json').data;


router.post('/', function(request) {
    var speechToReset = request.body;

    console.log('speechToReset', speechToReset);

    var resetSpeechQuery = "UPDATE speeches SET speech_date = NULL WHERE id = $1";

    pg.connect(connectionString, function (error, client, done) {
        if (error) {
            done();
            console.log(error);
            return response.status(500).json({success: false, data: error});
        }

        client.query(resetSpeechQuery, [speechToReset.id]);

        client.on('end', function () {
            client.end();
        })
    });
});

module.exports = router;

